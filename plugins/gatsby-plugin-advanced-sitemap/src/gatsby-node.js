import path from 'path'
import url from 'url'
import fs from 'fs-extra'

import defaultOptions from './defaults'
import Manager from './SiteMapManager'

const PUBLICPATH = `./public`
const XSLFILE = path.resolve(__dirname, `./static/sitemap.xsl`)
let siteUrl

const runQuery = (handler, { query, exclude }) => handler(query).then((r) => {
    if (r.errors) {
        throw new Error(r.errors.join(`, `))
    }

    for (let source in r.data) {
        // Removing excluded paths
        if (r.data[source] && r.data[source].edges && r.data[source].edges.length) {
            r.data[source].edges = r.data[source].edges.filter(({ node }) => !exclude.some((excludedRoute) => {
                const slug = source === `allMarkdownRemark` ? node.fields.slug.replace(/^\/|\/$/, ``) : node.slug.replace(/^\/|\/$/, ``)
                excludedRoute = excludedRoute.replace(/^\/|\/$/, ``)

                return slug.indexOf(excludedRoute) >= 0
            }))
        }
    }

    return r.data
})

const copyStylesheet = async ({ siteUrl, indexOutput }) => {
    const siteRegex = /(\{\{blog-url\}\})/g

    // Get our stylesheet template
    const data = await fs.readFile(XSLFILE)

    // Replace the `{{blog-url}}` variable with our real site URL
    const sitemapStylesheet = data.toString().replace(siteRegex, url.resolve(siteUrl, indexOutput))

    // Save the updated stylesheet to the public folder, so it will be
    // available for the xml sitemap files
    await fs.writeFile(path.join(PUBLICPATH, `sitemap.xsl`), sitemapStylesheet)
}

const serializeMarkdownNodes = (node) => {
    if (!node.fields.slug) {
        throw Error(`\`slug\` is a required field`)
    }

    node.slug = node.fields.slug

    delete node.fields.slug

    if (node.frontmatter) {
        if (node.frontmatter.published_at) {
            node.published_at = node.frontmatter.published_at
            delete node.frontmatter.published_at
        }
        if (node.frontmatter.feature_image) {
            node.feature_image = node.frontmatter.feature_image
            delete node.frontmatter.feature_image
        }
    }

    return node
}

const serialize = ({ site, ...sources }, mapping, pathPrefix) => {
    const nodes = []
    const sourceObject = {}

    siteUrl = site.siteMetadata.siteUrl

    for (let source in sources) {
        if (mapping[source].name) {
            const currentSource = sources.hasOwnProperty(source) ? sources[source] : []

            if (currentSource) {
                sourceObject[mapping[source].source] = []
                currentSource.edges.map(({ node }) => {
                    if (!node) {
                        return
                    }
                    if (source === `allMarkdownRemark`) {
                        node = serializeMarkdownNodes(node)
                    }
                    // Add site path prefix and resources prefix to create the correct absolute URL
                    const nodePath = path.join(pathPrefix, mapping[source].prefix, node.slug)

                    sourceObject[mapping[source].source].push({
                        url: url.resolve(siteUrl, nodePath),
                        node: node,
                    })
                })
            }
        }
    }
    nodes.push(sourceObject)

    return nodes
}

export const onPostBuild = async ({ graphql, pathPrefix }, pluginOptions) => {
    const options = Object.assign(defaultOptions, options, pluginOptions)

    delete options.plugins
    delete options.createLinkInHead

    const { indexOutput, resourcesOutput, mapping } = options

    const indexSitemapFile = path.join(PUBLICPATH, indexOutput)
    const resourcesSitemapFile = path.join(PUBLICPATH, resourcesOutput)

    const queryRecords = await runQuery(
        graphql,
        options
    )

    // Instanciate the Ghost Sitemaps Manager
    const manager = new Manager(options)

    serialize(queryRecords, mapping, pathPrefix).forEach((source) => {
        for (let type in source) {
            source[type].forEach((node) => {
                // "feed" the sitemaps manager with our serialized records
                manager.addUrls(type, node)
            })
        }
    })

    // The siteUrl is only available after we have the returned query results
    options.siteUrl = siteUrl

    await copyStylesheet(options)

    const indexSiteMap = manager.getIndexXml(options)
    const resourcesSiteMapsArray = []

    for (let resourceType in mapping) {
        const source = mapping[resourceType].source
        resourcesSiteMapsArray.push({
            type: mapping[resourceType].name,
            xml: manager.getSiteMapXml(source, options),
        })
    }

    // Save the generated xml files in the public folder
    try {
        await fs.writeFile(indexSitemapFile, indexSiteMap)

        resourcesSiteMapsArray.forEach(async (sitemap) => {
            const filePath = resourcesSitemapFile.replace(/:resource/, sitemap.type)
            await fs.writeFile(filePath, sitemap.xml)
        })
    } catch (err) {
        console.error(err)
    }

    return
}
