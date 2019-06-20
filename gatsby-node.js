const path = require(`path`)
const config = require(`./src/utils/siteConfig`)
const { paginate } = require(`gatsby-awesome-pagination`)

/**
* Here is the place where Gatsby creates the URLs for all the
* posts, tags, pages and authors that we fetched from the Ghost site.
*/
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    /**
    * Posts
    */
    const createPosts = new Promise((resolve, reject) => {
        const postTemplate = path.resolve(`./src/templates/post.js`)
        const indexTemplate = path.resolve(`./src/templates/index.js`)
        resolve(
            graphql(`
                {
                    allGhostPost(
                        sort: {order: ASC, fields: published_at}
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

                items.forEach(({ node }) => {
                    // This part here defines, that our posts will use
                    // a `/:slug/` permalink.
                    node.url = `/${node.slug}/`

                    createPage({
                        path: node.url,
                        component: postTemplate,
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

    /**
    * Tags
    */
    const createTags = new Promise((resolve, reject) => {
        const tagsTemplate = path.resolve(`./src/templates/tag.js`)
        resolve(
            graphql(`
                {
                    allGhostTag(
                        sort: {order: ASC, fields: name}
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

                items.forEach(({ node }) => {
                    const totalPosts = node.postCount !== null ? node.postCount : 0
                    const numberOfPages = Math.ceil(totalPosts / postsPerPage)

                    // This part here defines, that our tag pages will use
                    // a `/tag/:slug/` permalink.
                    node.url = `/tag/${node.slug}/`

                    Array.from({ length: numberOfPages }).forEach((_, i) => {
                        const currentPage = i + 1
                        const prevPageNumber = currentPage <= 1 ? null : currentPage - 1
                        const nextPageNumber = currentPage + 1 > numberOfPages ? null : currentPage + 1
                        const previousPagePath = prevPageNumber ? prevPageNumber === 1 ? node.url : `${node.url}page/${prevPageNumber}/` : null
                        const nextPagePath = nextPageNumber ? `${node.url}page/${nextPageNumber}/` : null

                        createPage({
                            path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
                            component: tagsTemplate,
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

    /**
    * Authors
    */
    const createAuthors = new Promise((resolve, reject) => {
        const authorTemplate = path.resolve(`./src/templates/author.js`)
        resolve(
            graphql(`
                {
                    allGhostAuthor(
                        sort: {order: ASC, fields: name}
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

                items.forEach(({ node }) => {
                    const totalPosts = node.postCount !== null ? node.postCount : 0
                    const numberOfPages = Math.ceil(totalPosts / postsPerPage)

                    // This part here defines, that our author pages will use
                    // a `/author/:slug/` permalink.
                    node.url = `/author/${node.slug}/`

                    Array.from({ length: numberOfPages }).forEach((_, i) => {
                        const currentPage = i + 1
                        const prevPageNumber = currentPage <= 1 ? null : currentPage - 1
                        const nextPageNumber = currentPage + 1 > numberOfPages ? null : currentPage + 1
                        const previousPagePath = prevPageNumber ? prevPageNumber === 1 ? node.url : `${node.url}page/${prevPageNumber}/` : null
                        const nextPagePath = nextPageNumber ? `${node.url}page/${nextPageNumber}/` : null

                        createPage({
                            path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
                            component: authorTemplate,
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

    /**
    * Pages
    */
    const createPages = new Promise((resolve, reject) => {
        const pageTemplate = path.resolve(`./src/templates/page.js`)
        resolve(
            graphql(`
                {
                    allGhostPage(
                        sort: {order: ASC, fields: published_at}
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

                items.forEach(({ node }) => {
                    // This part here defines, that our pages will use
                    // a `/:slug/` permalink.
                    node.url = `/${node.slug}/`

                    createPage({
                        path: node.url,
                        component: pageTemplate,
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
