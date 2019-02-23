"use strict";

var SiteMapIndexGenerator = require("./SiteMapIndexGenerator");

var PagesMapGenerator = require("./SiteMapPageGenerator");

var PostsMapGenerator = require("./PostMapGenerator");

var UsersMapGenerator = require("./UserMapGenerator");

var TagsMapGenerator = require("./TagsMapGenerator");

var SiteMapManager =
/*#__PURE__*/
function () {
  function SiteMapManager(options) {
    console.log("TCL: SiteMapManager -> constructor -> options", options);
    options = options || {};
    this.pages = options.pages || this.createPagesGenerator(options);
    this.posts = options.posts || this.createPostsGenerator(options);
    this.users = this.authors = options.authors || this.createUsersGenerator(options);
    this.tags = options.tags || this.createTagsGenerator(options);
    this.index = options.index || this.createIndexGenerator(options); // common.events.on(`router.created`, (router) => {
    //     if (router.name === `StaticRoutesRouter`) {
    //         this.pages.addUrl(router.getRoute({ absolute: true }), { id: router.identifier, staticRoute: true })
    //     }
    //     if (router.name === `CollectionRouter`) {
    //         this.pages.addUrl(router.getRoute({ absolute: true }), { id: router.identifier, staticRoute: false })
    //     }
    // })
    // common.events.on(`url.added`, (obj) => {
    //     this[obj.resource.config.type].addUrl(obj.url.absolute, obj.resource.data)
    // })
    // common.events.on(`url.removed`, (obj) => {
    //     this[obj.resource.config.type].removeUrl(obj.url.absolute, obj.resource.data)
    // })
    // common.events.on(`routers.reset`, () => {
    //     this.pages && this.pages.reset()
    //     this.posts && this.posts.reset()
    //     this.users && this.users.reset()
    //     this.tags && this.tags.reset()
    // })
  }

  var _proto = SiteMapManager.prototype;

  _proto.createIndexGenerator = function createIndexGenerator() {
    return new SiteMapIndexGenerator({
      types: {
        pages: this.pages,
        posts: this.posts,
        authors: this.authors,
        tags: this.tags
      }
    });
  };

  _proto.createPagesGenerator = function createPagesGenerator(options) {
    return new PagesMapGenerator(options);
  };

  _proto.createPostsGenerator = function createPostsGenerator(options) {
    return new PostsMapGenerator(options);
  };

  _proto.createUsersGenerator = function createUsersGenerator(options) {
    return new UsersMapGenerator(options);
  };

  _proto.createTagsGenerator = function createTagsGenerator(options) {
    return new TagsMapGenerator(options);
  };

  _proto.getIndexXml = function getIndexXml() {
    return this.index.getXml();
  };

  _proto.getSiteMapXml = function getSiteMapXml(type) {
    return this[type].getXml();
  };

  return SiteMapManager;
}();

module.exports = SiteMapManager;