const SiteMapIndexGenerator = require(`./SiteMapIndexGenerator`)
const PagesMapGenerator = require(`./SiteMapPageGenerator`)
const PostsMapGenerator = require(`./post-generator`)
const UsersMapGenerator = require(`./user-generator`)
const TagsMapGenerator = require(`./tag-generator`)

class SiteMapManager {
    constructor(options) {
        options = options || {}

        this.pages = options.pages || this.createPagesGenerator(options)
        this.posts = options.posts || this.createPostsGenerator(options)
        this.users = this.authors = options.authors || this.createUsersGenerator(options)
        this.tags = options.tags || this.createTagsGenerator(options)
        this.index = options.index || this.createIndexGenerator(options)
    }

    createIndexGenerator() {
        return new SiteMapIndexGenerator({
            types: {
                pages: this.pages,
                posts: this.posts,
                authors: this.authors,
                tags: this.tags,
            },
        })
    }

    createPagesGenerator(options) {
        return new PagesMapGenerator(options)
    }

    createPostsGenerator(options) {
        return new PostsMapGenerator(options)
    }

    createUsersGenerator(options) {
        return new UsersMapGenerator(options)
    }

    createTagsGenerator(options) {
        return new TagsMapGenerator(options)
    }

    getIndexXml() {
        return this.index.getXml()
    }

    getSiteMapXml(type) {
        return this[type].getXml()
    }
}

module.exports = SiteMapManager
