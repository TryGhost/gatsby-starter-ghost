const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const config = require(`./src/utils/siteConfig`)
const { paginate } = require(`gatsby-awesome-pagination`)

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    const createPosts = new Promise((resolve, reject) => {
        const postTemplate = path.resolve(`./src/templates/post.js`)
        const indexTemplate = path.resolve(`./src/templates/index.js`)
        resolve(
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
                            }
                        }
                    }
                }`
            ).then((result) => {
                if (result.errors) {
                    return reject(result.errors)
                }

                if (!result.data.allGhostPost) {
                    return resolve()
                }

                const items = result.data.allGhostPost.edges

                _.forEach(items, ({ node }) => {
                    // Update the existing URL field to reflect the URL in Gatsby and
                    // not in Ghost. Also needed to link to related posts.
                    node.url = `/${node.slug}/`

                    createPage({
                        path: node.url,
                        component: path.resolve(postTemplate),
                        context: {
                            // Data passed to context is available
                            // in page queries as GraphQL variables.
                            slug: node.slug,
                        },
                    })
                })

                // Pagination for posts, e.g., /, /page/2, /page/3
                paginate({
                    createPage,
                    items: items,
                    itemsPerPage: config.postsPerPage,
                    component: indexTemplate,
                    pathPrefix: ({ pageNumber }) => {
                        if (pageNumber === 0) {
                            return `/`
                        } else {
                            return `/page`
                        }
                    },
                })

                return resolve()
            })
        )
    })

    const createTags = new Promise((resolve, reject) => {
        const tagsTemplate = path.resolve(`./src/templates/tag.js`)
        resolve(
            graphql(`
                {
                    allGhostTag(
                        sort: {order: ASC, fields: name},
                        filter: {
                            slug: {ne: "data-schema"}
                        }
                    ) {
                        edges {
                            node {
                                slug
                                url
                                postCount
                            }
                        }
                    }
                }`
            ).then((result) => {
                if (result.errors) {
                    return reject(result.errors)
                }

                if (!result.data.allGhostTag) {
                    return resolve()
                }

                const items = result.data.allGhostTag.edges
                const postsPerPage = config.postsPerPage

                _.forEach(items, ({ node }) => {
                    const totalPosts = node.postCount !== null ? node.postCount : 0
                    const numberOfPages = Math.ceil(totalPosts / postsPerPage)

                    // Update the existing URL field to reflect the URL in Gatsby and
                    // not in Ghost.
                    node.url = `/tag/${node.slug}/`

                    Array.from({ length: numberOfPages }).forEach((_, i) => {
                        const currentPage = i + 1
                        const prevPageNumber = currentPage <= 1 ? null : currentPage - 1
                        const nextPageNumber = currentPage + 1 > numberOfPages ? null : currentPage + 1
                        const previousPagePath = prevPageNumber ? prevPageNumber === 1 ? node.url : `${node.url}page/${prevPageNumber}/` : null
                        const nextPagePath = nextPageNumber ? `${node.url}page/${nextPageNumber}/` : null

                        createPage({
                            path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
                            component: path.resolve(tagsTemplate),
                            context: {
                                // Data passed to context is available
                                // in page queries as GraphQL variables.
                                slug: node.slug,
                                limit: postsPerPage,
                                skip: i * postsPerPage,
                                numberOfPages: numberOfPages,
                                humanPageNumber: currentPage,
                                prevPageNumber: prevPageNumber,
                                nextPageNumber: nextPageNumber,
                                previousPagePath: previousPagePath,
                                nextPagePath: nextPagePath,
                            },
                        })
                    })
                })

                return resolve()
            })
        )
    })

    const createAuthors = new Promise((resolve, reject) => {
        const authorTemplate = path.resolve(`./src/templates/author.js`)
        resolve(
            graphql(`
                {
                    allGhostAuthor(
                        sort: {order: ASC, fields: name},
                        filter: {
                            slug: {ne: "data-schema-author"}
                        }
                    ) {
                        edges {
                            node {
                                slug
                                url
                                postCount
                            }
                        }
                    }
                }`
            ).then((result) => {
                if (result.errors) {
                    return reject(result.errors)
                }

                if (!result.data.allGhostAuthor) {
                    return resolve()
                }

                const items = result.data.allGhostAuthor.edges
                const postsPerPage = config.postsPerPage

                _.forEach(items, ({ node }) => {
                    const totalPosts = node.postCount !== null ? node.postCount : 0
                    const numberOfPages = Math.ceil(totalPosts / postsPerPage)

                    // Update the existing URL field to reflect the URL in Gatsby and
                    // not in Ghost.
                    node.url = `/author/${node.slug}/`

                    Array.from({ length: numberOfPages }).forEach((_, i) => {
                        const currentPage = i + 1
                        const prevPageNumber = currentPage <= 1 ? null : currentPage - 1
                        const nextPageNumber = currentPage + 1 > numberOfPages ? null : currentPage + 1
                        const previousPagePath = prevPageNumber ? prevPageNumber === 1 ? node.url : `${node.url}page/${prevPageNumber}/` : null
                        const nextPagePath = nextPageNumber ? `${node.url}page/${nextPageNumber}/` : null

                        createPage({
                            path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
                            component: path.resolve(authorTemplate),
                            context: {
                                // Data passed to context is available
                                // in page queries as GraphQL variables.
                                slug: node.slug,
                                limit: postsPerPage,
                                skip: i * postsPerPage,
                                numberOfPages: numberOfPages,
                                humanPageNumber: currentPage,
                                prevPageNumber: prevPageNumber,
                                nextPageNumber: nextPageNumber,
                                previousPagePath: previousPagePath,
                                nextPagePath: nextPagePath,
                            },
                        })
                    })
                })
                return resolve()
            })
        )
    })

    const createPages = new Promise((resolve, reject) => {
        const pageTemplate = path.resolve(`./src/templates/page.js`)
        resolve(
            graphql(`
                {
                    allGhostPage(
                        sort: {order: ASC, fields: published_at},
                        filter: {
                            slug: {ne: "data-schema-page"}
                        }
                    ) {
                        edges {
                            node {
                                slug
                                url
                            }
                        }
                    }
                }`
            ).then((result) => {
                if (result.errors) {
                    return reject(result.errors)
                }

                if (!result.data.allGhostPage) {
                    return resolve()
                }

                const items = result.data.allGhostPage.edges

                _.forEach(items, ({ node }) => {
                    // Update the existing URL field to reflect the URL in Gatsby and
                    // not in Ghost.
                    node.url = `/${node.slug}/`

                    createPage({
                        path: node.url,
                        component: path.resolve(pageTemplate),
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

    return Promise.all([createPosts, createTags, createAuthors, createPages])
}
