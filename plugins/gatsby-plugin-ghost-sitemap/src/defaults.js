const defaultOptions = {
    query: `
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allGhostPost(sort: {order: ASC, fields: published_at}) {
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
      allGhostPage(sort: {order: ASC, fields: published_at}) {
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
      allGhostTag(sort: {order: ASC, fields: name}) {
        edges {
            node {
                id
                slug
                feature_image
            }
        }
      }
      allGhostAuthor(sort: {order: ASC, fields: name}) {
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
        `/data-schema`,
        `/data-schema-author`,
        `/data-schema-page`,
    ],
    createLinkInHead: true,
}

export default defaultOptions
