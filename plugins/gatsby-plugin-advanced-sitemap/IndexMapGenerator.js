"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _xml = _interopRequireDefault(require("xml"));

var _moment = _interopRequireDefault(require("moment"));

var _url = _interopRequireDefault(require("url"));

var _utils = _interopRequireDefault(require("./utils"));

var XMLNS_DECLS = {
  _attr: {
    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
  }
};

var SiteMapIndexGenerator =
/*#__PURE__*/
function () {
  function SiteMapIndexGenerator(options) {
    options = options || {};
    this.types = options.types;
  }

  var _proto = SiteMapIndexGenerator.prototype;

  _proto.getXml = function getXml(options) {
    var urlElements = this.generateSiteMapUrlElements(options);
    var data = {
      // Concat the elements to the _attr declaration
      sitemapindex: [XMLNS_DECLS].concat(urlElements) // Return the xml

    };
    return _utils.default.getDeclarations(options) + (0, _xml.default)(data);
  };

  _proto.generateSiteMapUrlElements = function generateSiteMapUrlElements(_ref) {
    var siteUrl = _ref.siteUrl,
        resourcesOutput = _ref.resourcesOutput,
        mapping = _ref.mapping;
    return _lodash.default.map(mapping, function (resourceType) {
      var filePath = resourcesOutput.replace(/:resource/, resourceType.name);

      var siteMapUrl = _url.default.resolve(siteUrl, filePath);

      var lastModified = resourceType.lastModified || (0, _moment.default)(new Date(), _moment.default.ISO_8601).toISOString();
      return {
        sitemap: [{
          loc: siteMapUrl
        }, {
          lastmod: (0, _moment.default)(lastModified).toISOString()
        }]
      };
    });
  };

  return SiteMapIndexGenerator;
}();

exports.default = SiteMapIndexGenerator;