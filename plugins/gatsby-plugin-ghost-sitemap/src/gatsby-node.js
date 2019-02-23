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

    // copy our template stylesheet to the public folder, so it will be available for the
    // xml files
    try {
        await fs.copyFile(xslFile, path.join(publicPath, `sitemap.xsl`))
    } catch (err) {
        console.error(err)
    }

    const { query, output, exclude, mapping } = {
        ...defaultOptions,
        ...options,
    }

    const saved = path.join(publicPath, output)

    const manager = new Manager()

    // Paths we're excluding...
    const excludeOptions = exclude.concat(defaultOptions.exclude)

    const queryRecords = await runQuery(
        graphql,
        query,
        excludeOptions,
        pathPrefix
    )

    serialize(queryRecords, mapping).forEach((source) => {
        for (let type in source) {
            source[type].forEach((node) => {
                manager.addUrl(type, node)
            })
        }
    })

    const indexSiteMap = manager.getIndexXml()

    try {
        await fs.writeFile(saved, indexSiteMap)
    } catch (err) {
        console.error(err)
    }

    return
}
