"use strict";

exports.__esModule = true;
exports.default = void 0;
var sitemapsUtils = {
  // TODO: serve file from static folder -> copy?
  getDeclarations: function getDeclarations() {
    var baseUrl = "http://localhost:9000/sitemap.xsl";
    baseUrl = baseUrl.replace(/^(http:|https:)/, "");
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + "<?xml-stylesheet type=\"text/xsl\" href=\"" + baseUrl + "\"?>";
  }
};
var _default = sitemapsUtils;
exports.default = _default;