"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _ = require("lodash"),
    BaseMapGenerator = require("./BaseSiteMapGenerator");

var TagsMapGenerator =
/*#__PURE__*/
function (_BaseMapGenerator) {
  (0, _inheritsLoose2.default)(TagsMapGenerator, _BaseMapGenerator);

  function TagsMapGenerator(opts) {
    var _this;

    _this = _BaseMapGenerator.call(this) || this;
    _this.name = "tags";

    _.extend((0, _assertThisInitialized2.default)(_this), opts);

    return _this;
  }

  return TagsMapGenerator;
}(BaseMapGenerator);

module.exports = TagsMapGenerator;