"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _ = require("lodash");

var BaseSiteMapGenerator = require("./BaseSiteMapGenerator");

var SiteMapPageGenerator =
/*#__PURE__*/
function (_BaseSiteMapGenerator) {
  (0, _inheritsLoose2.default)(SiteMapPageGenerator, _BaseSiteMapGenerator);

  function SiteMapPageGenerator(opts) {
    var _this;

    _this = _BaseSiteMapGenerator.call(this) || this;
    _this.name = "pages";

    _.extend((0, _assertThisInitialized2.default)(_this), opts);

    return _this;
  }

  return SiteMapPageGenerator;
}(BaseSiteMapGenerator);

module.exports = SiteMapPageGenerator;