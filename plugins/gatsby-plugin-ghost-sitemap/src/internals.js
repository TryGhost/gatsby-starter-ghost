const withoutTrailingSlash = (path) => {
    if (path === `/`) {
        return path
    }
    return path.replace(/\/$/, ``)
}

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
                id
                slug
                updated_at
                created_at
                feature_image
            }
        }
      }
      allGhostPage(
        sort: {order: ASC, fields: published_at},
        filter: {slug: {ne: "data-schema-page"}}
      ) {
        edges {
            node {
                id
                slug
                updated_at
                created_at
                feature_image
            }
        }
      }
      allGhostTag(
        sort: {order: ASC, fields: name},
        filter: {slug: {ne: "data-schema"}}
      ) {
        edges {
            node {
                id
                slug
                feature_image
            }
        }
      }
      allGhostAuthor(
        sort: {order: ASC, fields: name},
        filter: {slug: {ne: "data-schema-author"}}
      ) {
        edges {
            node {
                id
                slug
                profile_image
            }
        }
      }
  }`,
    indexOutput: `/sitemap.xml`,
    resourcesOutput: `/sitemap-:resource.xml`,
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
        allGhostPage: {
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
