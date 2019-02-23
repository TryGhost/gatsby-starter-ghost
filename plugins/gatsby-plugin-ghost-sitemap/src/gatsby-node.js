import path from "path"
import url from "url"
import sitemap from "sitemap"
import { defaultOptions, runQuery, writeFile } from "./internals"
// import Manager from "./SiteMapManager"

const publicPath = `./public`

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
                    sourceObject[mapping[source].name].push({
                        url: url.resolve(siteUrl, mapping[source].prefix ,edge.node.slug),
                        datum: edge.node,
                    })
                })
            }
        }
    }
    nodes.push(sourceObject)

    return nodes
}

exports.onPostBuild = async ({ graphql, pathPrefix }, pluginOptions) => {
    const options = { ...pluginOptions }
    delete options.plugins
    delete options.createLinkInHead

    const { query, output, exclude, mapping, ...rest } = {
        ...defaultOptions,
        ...options,
    }

    const map = sitemap.createSitemap(rest)
    const saved = path.join(publicPath, output)

    // Manager = new Manager()

    // Paths we're excluding...
    const excludeOptions = exclude.concat(defaultOptions.exclude)

    const queryRecords = await runQuery(
        graphql,
        query,
        excludeOptions,
        pathPrefix
    )

    serialize(queryRecords, mapping).forEach(u => map.add(u))

    return await writeFile(saved, map.toString())
}
