import path from 'path'
import url from 'url'
import fs from 'fs-extra'

import defaultOptions from './defaults'
import Manager from './SiteMapManager'

const PUBLICPATH = `./public`
const XSLFILE = path.resolve(__dirname, `./static/sitemap.xsl`)
let siteUrl

const runQuery = (handler, query, excludes) => handler(query).then((r) => {
    if (r.errors) {
        throw new Error(r.errors.join(`, `))
    }

    for (let source in r.data) {
        // Removing excluded paths
        if (r.data[source] && r.data[source].edges && r.data[source].edges.length) {
            r.data[source].edges = r.data[source].edges.filter(({ node }) => !excludes.some((excludedRoute) => {
                const slug = node.slug.replace(/^\/|\/$/, ``)
                excludedRoute = excludedRoute.replace(/^\/|\/$/, ``)

                return slug.indexOf(excludedRoute) >= 0
            }))
        }
    }

    return r.data
})

const copyStylesheet = async () => {
    const siteRegex = /(\{\{blog-url\}\})/g

    // Get our stylesheet template
    const data = await fs.readFile(XSLFILE)

    // Replace the `{{blog-url}}` variable with our real site URL
    const sitemapStylesheet = data.toString().replace(siteRegex, siteUrl)

    // Save the updated stylesheet to the public folder, so it will be
    // available for the xml sitemap files
    await fs.writeFile(path.join(PUBLICPATH, `sitemap.xsl`), sitemapStylesheet)
}

const serialize = ({ site, ...sources }, mapping, pathPrefix) => {
    const nodes = []
    const sourceObject = {}

    siteUrl = site.siteMetadata.siteUrl

    for (let source in sources) {
        if (mapping[source].name) {
            const currentSource = sources.hasOwnProperty(source) ? sources[source] : []

            if (currentSource) {
                sourceObject[mapping[source].name] = []
                currentSource.edges.map(({ node }) => {
                    if (!node) {
                        return
                    }

                    // Add site path prefix and resources prefix to create the correct absolute URL
                    const nodePath = path.join(pathPrefix, mapping[source].prefix, node.slug)

                    sourceObject[mapping[source].name].push({
                        url: url.resolve(siteUrl, nodePath),
                        node: node,
                    })
                })
            }
        }
    }
    nodes.push(sourceObject)

    // Add the siteUrl as setup in Gatsby config of the app, so we can create the
    // correct back links in the sitemap
    nodes.push({ site: [{ siteUrl: siteUrl }] })

    return nodes
}

export const onPostBuild = async ({ graphql, pathPrefix }, pluginOptions) => {
    const options = { ...pluginOptions }
    delete options.plugins
    delete options.createLinkInHead

    const { query, indexOutput, resourcesOutput, exclude, mapping } = {
        ...defaultOptions,
        ...options,
    }

    const indexSitemapFile = path.join(PUBLICPATH, indexOutput)
    const resourcesSitemapFile = path.join(PUBLICPATH, resourcesOutput)

    // Paths we're excluding...
    const excludeOptions = exclude.concat(defaultOptions.exclude)

    const queryRecords = await runQuery(
        graphql,
        query,
        excludeOptions,
    )

    // Instanciate the Ghost Sitemaps Manager
    const manager = new Manager()

    serialize(queryRecords, mapping, pathPrefix).forEach((source) => {
        for (let type in source) {
            source[type].forEach((node) => {
                // "feed" the sitemaps manager with our serialized records
                manager.addUrls(type, node)
            })
        }
    })

    await copyStylesheet()

    const indexSiteMap = manager.getIndexXml()
    const resourcesSiteMapsArray = []

    for (let resourceType in mapping) {
        const type = mapping[resourceType].name
        resourcesSiteMapsArray.push({
            type: type,
            xml: manager.getSiteMapXml(type),
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
