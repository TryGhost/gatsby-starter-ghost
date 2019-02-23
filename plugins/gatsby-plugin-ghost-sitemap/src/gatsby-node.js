import path from 'path'
import url from 'url'
import fs from 'fs-extra'
import { defaultOptions, runQuery } from './internals'
import Manager from './SiteMapManager'

const publicPath = `./public`
const xslFile = path.resolve(__dirname, `./static/sitemap.xsl`)

const serialize = ({ site, ...sources }, mapping) => {
    const siteUrl = site.siteMetadata.siteUrl
    const nodes = []
    const sourceObject = {}

    for (let source in sources) {
        if (mapping[source].name) {
            const currentSource = sources.hasOwnProperty(source) ? sources[source] : []

            if (currentSource) {
                sourceObject[mapping[source].name] = []
                currentSource.edges.map((edge) => {
                    const nodePath = path.join(mapping[source].prefix, edge.node.slug)

                    sourceObject[mapping[source].name].push({
                        url: url.resolve(siteUrl, nodePath),
                        node: edge.node,
                    })
                })
            }
        }
    }
    nodes.push(sourceObject)

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

    const indexSitemapFile = path.join(publicPath, indexOutput)
    const resourcesSitemapFile = path.join(publicPath, resourcesOutput)

    // Paths we're excluding...
    const excludeOptions = exclude.concat(defaultOptions.exclude)

    const queryRecords = await runQuery(
        graphql,
        query,
        excludeOptions,
        pathPrefix
    )

    const manager = new Manager()

    serialize(queryRecords, mapping).forEach((source) => {
        for (let type in source) {
            source[type].forEach((node) => {
                manager.addUrls(type, node)
            })
        }
    })

    // copy our template stylesheet to the public folder, so it will be available for the
    // xml files
    try {
        await fs.copyFile(xslFile, path.join(publicPath, `sitemap.xsl`))
        console.log(`Sitemap stylesheet copied!`)
    } catch (err) {
        console.error(err)
    }

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
        console.log(`All sitemaps created!`)
    } catch (err) {
        console.error(err)
    }

    return
}
