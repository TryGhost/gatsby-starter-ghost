"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _url = _interopRequireDefault(require("url"));

var sitemapsUtils = {
  getDeclarations: function getDeclarations(_ref) {
    var siteUrl = _ref.siteUrl;

    var baseUrl = _url.default.resolve(siteUrl, "/sitemap.xsl");

    baseUrl = baseUrl.replace(/^(http:|https:)/, "");
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + "<?xml-stylesheet type=\"text/xsl\" href=\"" + baseUrl + "\"?>";
  }
};
var _default = sitemapsUtils;
exports.default = _default;