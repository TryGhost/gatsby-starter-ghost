"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.onPostBuild = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _path = _interopRequireDefault(require("path"));

var _url = _interopRequireDefault(require("url"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _internals = require("./internals");

var _SiteMapManager = _interopRequireDefault(require("./SiteMapManager"));

var publicPath = "./public";

var xslFile = _path.default.resolve(__dirname, "./static/sitemap.xsl");

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
          var nodePath = _path.default.join(mapping[source].prefix, edge.node.slug);

          sourceObject[mapping[source].name].push({
            url: _url.default.resolve(siteUrl, nodePath),
            node: edge.node
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

var onPostBuild =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref2, pluginOptions) {
    var graphql, pathPrefix, options, _defaultOptions$optio, query, output, exclude, mapping, saved, manager, excludeOptions, queryRecords, indexSiteMap;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            graphql = _ref2.graphql, pathPrefix = _ref2.pathPrefix;
            options = (0, _extends2.default)({}, pluginOptions);
            delete options.plugins;
            delete options.createLinkInHead; // copy our template stylesheet to the public folder, so it will be available for the
            // xml files

            _context.prev = 4;
            _context.next = 7;
            return _fsExtra.default.copyFile(xslFile, _path.default.join(publicPath, "sitemap.xsl"));

          case 7:
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](4);
            console.error(_context.t0);

          case 12:
            _defaultOptions$optio = (0, _extends2.default)({}, _internals.defaultOptions, options), query = _defaultOptions$optio.query, output = _defaultOptions$optio.output, exclude = _defaultOptions$optio.exclude, mapping = _defaultOptions$optio.mapping;
            saved = _path.default.join(publicPath, output);
            manager = new _SiteMapManager.default(); // Paths we're excluding...

            excludeOptions = exclude.concat(_internals.defaultOptions.exclude);
            _context.next = 18;
            return (0, _internals.runQuery)(graphql, query, excludeOptions, pathPrefix);

          case 18:
            queryRecords = _context.sent;
            serialize(queryRecords, mapping).forEach(function (source) {
              var _loop2 = function _loop2(type) {
                source[type].forEach(function (node) {
                  manager.addUrl(type, node);
                });
              };

              for (var type in source) {
                _loop2(type);
              }
            });
            indexSiteMap = manager.getIndexXml();
            _context.prev = 21;
            _context.next = 24;
            return _fsExtra.default.writeFile(saved, indexSiteMap);

          case 24:
            _context.next = 29;
            break;

          case 26:
            _context.prev = 26;
            _context.t1 = _context["catch"](21);
            console.error(_context.t1);

          case 29:
            return _context.abrupt("return");

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 9], [21, 26]]);
  }));

  return function onPostBuild(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.onPostBuild = onPostBuild;