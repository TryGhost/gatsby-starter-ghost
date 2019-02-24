export const runQuery = (handler, query, excludes) => handler(query).then((r) => {
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
