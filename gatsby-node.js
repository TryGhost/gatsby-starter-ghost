const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        const postTemplate = path.resolve(`./src/templates/post.js`)
        resolve(
            // TODO: go over needed fields here
            graphql(`
                {
                    allGhostPost(
                        sort: {order: ASC, fields: published_at},
                        filter: {
                            slug: {ne: "data-schema"}
                        }
                    ) {
                        edges {
                            node {
                                slug
                                title
                                url
                                published_at
                                feature_image
                                tags {
                                    slug
                                    name
                                    description
                                    meta_title
                                    meta_description
                                    feature_image
                                }
                            }
                        }
                    }
                }`
            ).then((result) => {
                if (result.errors) {
                    return reject(result.errors)
                }

                const items = result.data.allGhostPost.edges

                _.forEach(items, ({ node }) => {
                    // Update the existing URL field to reflect the URL in Gatsby and
                    // not in Ghost. Also needed to link to related posts.
                    node.url = node.slug

                    createPage({
                        path: node.slug,
                        component: path.resolve(postTemplate),
                        context: {
                            // Data passed to context is available
                            // in page queries as GraphQL variables.
                            slug: node.slug,
                        },
                    })
                })

                return resolve()
            })
        )
    })
}
