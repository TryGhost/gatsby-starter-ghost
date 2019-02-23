import fs from "fs"
import pify from "pify"
import minimatch from "minimatch"

const withoutTrailingSlash = (path) => {
    if (path === `/`) {
        return path
    }
    return path.replace(/\/$/, ``)
}

export const writeFile = pify(fs.writeFile)

export const runQuery = (handler, query, excludes, pathPrefix) => handler(query).then((r) => {
    if (r.errors) {
        throw new Error(r.errors.join(`, `))
    }

    // // Removing excluded paths
    // r.data.allSitePage.edges = r.data.allSitePage.edges.filter(
    //     page => !excludes.some(excludedRoute => minimatch(withoutTrailingSlash(page.node.path), excludedRoute)
    //     )
    // )

    // // Add path prefix
    // r.data.allSitePage.edges = r.data.allSitePage.edges.map((page) => {
    //     // uses `normalizePath` logic from `gatsby-link`
    //     page.node.path = (pathPrefix + page.node.path).replace(/^\/\//g, `/`)
    //     return page
    // })

    return r.data
})

export const defaultOptions = {
    query: `
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allGhostPost(
        sort: {order: ASC, fields: published_at},
        filter: {slug: {ne: "data-schema"}}
      ) {
        edges {
            node {
                slug
            }
        }
      }
      allGhostPage(
        sort: {order: ASC, fields: published_at},
        filter: {slug: {ne: "data-schema-page"}}
      ) {
        edges {
            node {
                slug
            }
        }
      }
      allGhostTag(
        sort: {order: ASC, fields: name},
        filter: {slug: {ne: "data-schema"}}
      ) {
        edges {
            node {
                slug
            }
        }
      }
      allGhostAuthor(
        sort: {order: ASC, fields: name},
        filter: {slug: {ne: "data-schema-author"}}
      ) {
        edges {
            node {
                slug
            }
        }
      }
  }`,
    output: `/sitemap.xml`,
    mapping: {
        allGhostPost: {
            name: `posts`,
            prefix: `/`,
        },
        allGhostTag: {
            name: `tags`,
            prefix: `tag`,
        },
        allGhostAuthor: {
            name: `authors`,
            prefix: `author`,
        },
        allGhosPage: {
            name: `pages`,
            prefix: `/`,
        },
    },
    exclude: [
        `/dev-404-page`,
        `/404`,
        `/404.html`,
        `/offline-plugin-app-shell-fallback`,
    ],
    createLinkInHead: true,
}
