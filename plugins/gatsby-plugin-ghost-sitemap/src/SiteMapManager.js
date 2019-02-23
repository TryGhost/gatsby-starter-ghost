import SiteMapIndexGenerator from "./SiteMapIndexGenerator"
import PagesMapGenerator from "./SiteMapPageGenerator"
import PostsMapGenerator from "./PostMapGenerator"
import UsersMapGenerator from "./UserMapGenerator"
import TagsMapGenerator from "./TagsMapGenerator"

export default class SiteMapManager {
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

    // This is the equivalent of adding the URLs on bootstrap by listening to the events
    // like we do in Ghost core
    addUrl(type, { url, node }) {
        return this[type].addUrl(url, node)
    }
}

