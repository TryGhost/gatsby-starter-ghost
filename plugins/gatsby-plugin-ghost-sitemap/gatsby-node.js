"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _path = _interopRequireDefault(require("path"));

var _url = _interopRequireDefault(require("url"));

var _sitemap = _interopRequireDefault(require("sitemap"));

var _internals = require("./internals");

// import Manager from "./SiteMapManager"
var publicPath = "./public";

var serialize = function serialize(_ref, mapping) {
  var site = _ref.site,
      sources = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["site"]);
  var siteUrl = site.siteMetadata.siteUrl;
  var nodes = [];
  var sourceObject = {};

  var _loop = function _loop(source) {
    if (mapping[source].name) {
      var currentSource = sources.hasOwnProperty(source) ? sources[source] : [];

      if (currentSource) {
        sourceObject[mapping[source].name] = [];
        currentSource.edges.map(function (edge) {
          sourceObject[mapping[source].name].push({
            url: _url.default.resolve(siteUrl, mapping[source].prefix, edge.node.slug),
            datum: edge.node
          });
        });
      }
    }
  };

  for (var source in sources) {
    _loop(source);
  }

  nodes.push(sourceObject);
  return nodes;
};

exports.onPostBuild =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref2, pluginOptions) {
    var graphql, pathPrefix, options, _defaultOptions$optio, query, output, exclude, mapping, rest, map, saved, excludeOptions, queryRecords;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            graphql = _ref2.graphql, pathPrefix = _ref2.pathPrefix;
            options = (0, _extends2.default)({}, pluginOptions);
            delete options.plugins;
            delete options.createLinkInHead;
            _defaultOptions$optio = (0, _extends2.default)({}, _internals.defaultOptions, options), query = _defaultOptions$optio.query, output = _defaultOptions$optio.output, exclude = _defaultOptions$optio.exclude, mapping = _defaultOptions$optio.mapping, rest = (0, _objectWithoutPropertiesLoose2.default)(_defaultOptions$optio, ["query", "output", "exclude", "mapping"]);
            map = _sitemap.default.createSitemap(rest);
            saved = _path.default.join(publicPath, output); // Manager = new Manager()
            // Paths we're excluding...

            excludeOptions = exclude.concat(_internals.defaultOptions.exclude);
            _context.next = 10;
            return (0, _internals.runQuery)(graphql, query, excludeOptions, pathPrefix);

          case 10:
            queryRecords = _context.sent;
            serialize(queryRecords, mapping).forEach(function (u) {
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
    return _ref3.apply(this, arguments);
  };
}();