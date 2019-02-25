"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _lodash = _interopRequireDefault(require("lodash"));

var _BaseSiteMapGenerator = _interopRequireDefault(require("./BaseSiteMapGenerator"));

var TagsMapGenerator =
/*#__PURE__*/
function (_BaseMapGenerator) {
  (0, _inheritsLoose2.default)(TagsMapGenerator, _BaseMapGenerator);

  function TagsMapGenerator(opts) {
    var _this;

    _this = _BaseMapGenerator.call(this) || this;
    _this.name = "tags";

    _lodash.default.extend((0, _assertThisInitialized2.default)(_this), opts);

    return _this;
  }

  return TagsMapGenerator;
}(_BaseSiteMapGenerator.default);

exports.default = TagsMapGenerator;