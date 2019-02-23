"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _ = require("lodash"),
    // validator = require(`validator`),
BaseMapGenerator = require("./BaseSiteMapGenerator");

var UserMapGenerator =
/*#__PURE__*/
function (_BaseMapGenerator) {
  (0, _inheritsLoose2.default)(UserMapGenerator, _BaseMapGenerator);

  function UserMapGenerator(opts) {
    var _this;

    _this = _BaseMapGenerator.call(this) || this;
    _this.name = "authors";

    _.extend((0, _assertThisInitialized2.default)(_this), opts);

    return _this;
  }

  var _proto = UserMapGenerator.prototype;

  _proto.validateImageUrl = function validateImageUrl(imageUrl) {
    // && validator.isURL(imageUrl, { protocols: [`http`, `https`], require_protocol: true })
    return imageUrl;
  };

  return UserMapGenerator;
}(BaseMapGenerator);

module.exports = UserMapGenerator;