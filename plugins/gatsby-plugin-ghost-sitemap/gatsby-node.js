"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _sitemap = _interopRequireDefault(require("sitemap"));

var _internals = require("./internals");

var publicPath = "./public";

exports.onPostBuild =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref, pluginOptions) {
    var graphql, pathPrefix, options, _defaultOptions$optio, query, serialize, output, exclude, rest, map, saved, excludeOptions, queryRecords;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            graphql = _ref.graphql, pathPrefix = _ref.pathPrefix;
            options = (0, _extends2.default)({}, pluginOptions);
            delete options.plugins;
            delete options.createLinkInHead;
            _defaultOptions$optio = (0, _extends2.default)({}, _internals.defaultOptions, options), query = _defaultOptions$optio.query, serialize = _defaultOptions$optio.serialize, output = _defaultOptions$optio.output, exclude = _defaultOptions$optio.exclude, rest = (0, _objectWithoutPropertiesLoose2.default)(_defaultOptions$optio, ["query", "serialize", "output", "exclude"]);
            map = _sitemap.default.createSitemap(rest);
            saved = _path.default.join(publicPath, output); // Paths we're excluding...

            excludeOptions = exclude.concat(_internals.defaultOptions.exclude);
            _context.next = 10;
            return (0, _internals.runQuery)(graphql, query, excludeOptions, pathPrefix);

          case 10:
            queryRecords = _context.sent;
            serialize(queryRecords).forEach(function (u) {
              return map.add(u);
            });
            _context.next = 14;
            return (0, _internals.writeFile)(saved, map.toString());

          case 14:
            return _context.abrupt("return", _context.sent);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();