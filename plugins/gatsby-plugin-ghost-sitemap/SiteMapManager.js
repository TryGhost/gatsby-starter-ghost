"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _SiteMapIndexGenerator = _interopRequireDefault(require("./SiteMapIndexGenerator"));

var _SiteMapPageGenerator = _interopRequireDefault(require("./SiteMapPageGenerator"));

var _PostMapGenerator = _interopRequireDefault(require("./PostMapGenerator"));

var _UserMapGenerator = _interopRequireDefault(require("./UserMapGenerator"));

var _TagsMapGenerator = _interopRequireDefault(require("./TagsMapGenerator"));

var SiteMapManager =
/*#__PURE__*/
function () {
  function SiteMapManager(options) {
    options = options || {};
    this.siteUrl = "";
    this.pages = options.pages || this.createPagesGenerator(options);
    this.posts = options.posts || this.createPostsGenerator(options);
    this.users = this.authors = options.authors || this.createUsersGenerator(options);
    this.tags = options.tags || this.createTagsGenerator(options);
    this.index = options.index || this.createIndexGenerator(options);
  }

  var _proto = SiteMapManager.prototype;

  _proto.createIndexGenerator = function createIndexGenerator() {
    return new _SiteMapIndexGenerator.default({
      types: {
        pages: this.pages,
        posts: this.posts,
        authors: this.authors,
        tags: this.tags
      }
    });
  };

  _proto.createPagesGenerator = function createPagesGenerator(options) {
    return new _SiteMapPageGenerator.default(options);
  };

  _proto.createPostsGenerator = function createPostsGenerator(options) {
    return new _PostMapGenerator.default(options);
  };

  _proto.createUsersGenerator = function createUsersGenerator(options) {
    return new _UserMapGenerator.default(options);
  };

  _proto.createTagsGenerator = function createTagsGenerator(options) {
    return new _TagsMapGenerator.default(options);
  };

  _proto.getIndexXml = function getIndexXml() {
    return this.index.getXml(this.siteUrl);
  };

  _proto.getSiteMapXml = function getSiteMapXml(type) {
    return this[type].getXml(this.siteUrl);
  } // This is the equivalent of adding the URLs on bootstrap by listening to the events
  // like we do in Ghost core
  ;

  _proto.addUrls = function addUrls(type, _ref) {
    var url = _ref.url,
        node = _ref.node,
        siteUrl = _ref.siteUrl;

    // Save the siteUrl, so we can pass it to functions where we normally
    // use the Ghost URL service
    if (type === "site") {
      return this.siteUrl = siteUrl;
    }

    return this[type].addUrl(url, node);
  };

  return SiteMapManager;
}();

exports.default = SiteMapManager;