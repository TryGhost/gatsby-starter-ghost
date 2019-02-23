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
  _regenerator.default.mark(function _callee2(_ref2, pluginOptions) {
    var graphql, pathPrefix, options, _defaultOptions$optio, query, indexOutput, resourcesOutput, exclude, mapping, indexSitemapFile, resourcesSitemapFile, excludeOptions, queryRecords, manager, indexSiteMap, resourcesSiteMapsArray, resourceType, type;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            graphql = _ref2.graphql, pathPrefix = _ref2.pathPrefix;
            options = (0, _extends2.default)({}, pluginOptions);
            delete options.plugins;
            delete options.createLinkInHead;
            _defaultOptions$optio = (0, _extends2.default)({}, _internals.defaultOptions, options), query = _defaultOptions$optio.query, indexOutput = _defaultOptions$optio.indexOutput, resourcesOutput = _defaultOptions$optio.resourcesOutput, exclude = _defaultOptions$optio.exclude, mapping = _defaultOptions$optio.mapping;
            indexSitemapFile = _path.default.join(publicPath, indexOutput);
            resourcesSitemapFile = _path.default.join(publicPath, resourcesOutput); // Paths we're excluding...

            excludeOptions = exclude.concat(_internals.defaultOptions.exclude);
            _context2.next = 10;
            return (0, _internals.runQuery)(graphql, query, excludeOptions, pathPrefix);

          case 10:
            queryRecords = _context2.sent;
            manager = new _SiteMapManager.default();
            serialize(queryRecords, mapping).forEach(function (source) {
              var _loop2 = function _loop2(type) {
                source[type].forEach(function (node) {
                  manager.addUrls(type, node);
                });
              };

              for (var type in source) {
                _loop2(type);
              }
            }); // copy our template stylesheet to the public folder, so it will be available for the
            // xml files

            _context2.prev = 13;
            _context2.next = 16;
            return _fsExtra.default.copyFile(xslFile, _path.default.join(publicPath, "sitemap.xsl"));

          case 16:
            console.log("Sitemap stylesheet copied!");
            _context2.next = 22;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](13);
            console.error(_context2.t0);

          case 22:
            indexSiteMap = manager.getIndexXml();
            resourcesSiteMapsArray = [];

            for (resourceType in mapping) {
              type = mapping[resourceType].name;
              resourcesSiteMapsArray.push({
                type: type,
                xml: manager.getSiteMapXml(type)
              });
            } // Save the generated xml files in the public folder


            _context2.prev = 25;
            _context2.next = 28;
            return _fsExtra.default.writeFile(indexSitemapFile, indexSiteMap);

          case 28:
            resourcesSiteMapsArray.forEach(
            /*#__PURE__*/
            function () {
              var _ref4 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(sitemap) {
                var filePath;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        filePath = resourcesSitemapFile.replace(/:resource/, sitemap.type);
                        _context.next = 3;
                        return _fsExtra.default.writeFile(filePath, sitemap.xml);

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x3) {
                return _ref4.apply(this, arguments);
              };
            }());
            console.log("All sitemaps created!");
            _context2.next = 35;
            break;

          case 32:
            _context2.prev = 32;
            _context2.t1 = _context2["catch"](25);
            console.error(_context2.t1);

          case 35:
            return _context2.abrupt("return");

          case 36:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[13, 19], [25, 32]]);
  }));

  return function onPostBuild(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.onPostBuild = onPostBuild;