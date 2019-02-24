import SiteMapIndexGenerator from "./IndexMapGenerator"
import PageMapGenerator from "./PageMapGenerator"
import PostMapGenerator from "./PostMapGenerator"
import UsersMapGenerator from "./UserMapGenerator"
import TagMapGenerator from "./TagMapGenerator"

export default class SiteMapManager {
    constructor(options) {
        options = options || {}

        this.options = options
        this.siteUrl = ``

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
        return new PageMapGenerator(options)
    }

    createPostsGenerator(options) {
        return new PostMapGenerator(options)
    }

    createUsersGenerator(options) {
        return new UsersMapGenerator(options)
    }

    createTagsGenerator(options) {
        return new TagMapGenerator(options)
    }

    getIndexXml(options) {
        return this.index.getXml(options)
    }

    getSiteMapXml(type, options) {
        return this[type].getXml(options)
    }

    // This is the equivalent of adding the URLs on bootstrap by listening to the events
    // like we do in Ghost core
    addUrls(type, { url, node, siteUrl }) {
        // Save the siteUrl, so we can pass it to functions where we normally
        // use the Ghost URL service
        if (type === `site`) {
            return this.siteUrl = siteUrl
        }
        return this[type].addUrl(url, node)
    }
}

