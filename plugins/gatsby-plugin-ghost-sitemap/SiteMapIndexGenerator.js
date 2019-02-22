"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _xml = _interopRequireDefault(require("xml"));

var _moment = _interopRequireDefault(require("moment"));

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

  _proto.getXml = function getXml() {
    var urlElements = this.generateSiteMapUrlElements(),
        data = {
      // Concat the elements to the _attr declaration
      sitemapindex: [XMLNS_DECLS].concat(urlElements) // Return the xml

    };
    return _utils.default.getDeclarations() + (0, _xml.default)(data);
  };

  _proto.generateSiteMapUrlElements = function generateSiteMapUrlElements() {
    return _lodash.default.map(this.types, function (resourceType) {
      var url = "http://localhost:9000/sitemap-" + resourceType + ".xml";
      var lastModified = resourceType.lastModified;
      return {
        sitemap: [{
          loc: url
        }, {
          lastmod: (0, _moment.default)(lastModified).toISOString()
        }]
      };
    });
  };

  return SiteMapIndexGenerator;
}();

exports.default = SiteMapIndexGenerator;