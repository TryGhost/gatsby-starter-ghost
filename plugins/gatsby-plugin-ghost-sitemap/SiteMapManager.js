"use strict";

var SiteMapIndexGenerator = require("./SiteMapIndexGenerator");

var PagesMapGenerator = require("./SiteMapPageGenerator");

var PostsMapGenerator = require("./post-generator");

var UsersMapGenerator = require("./user-generator");

var TagsMapGenerator = require("./tag-generator");

var SiteMapManager =
/*#__PURE__*/
function () {
  function SiteMapManager(options) {
    options = options || {};
    this.pages = options.pages || this.createPagesGenerator(options);
    this.posts = options.posts || this.createPostsGenerator(options);
    this.users = this.authors = options.authors || this.createUsersGenerator(options);
    this.tags = options.tags || this.createTagsGenerator(options);
    this.index = options.index || this.createIndexGenerator(options);
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