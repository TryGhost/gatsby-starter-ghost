"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.onPostBuild = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _url = _interopRequireDefault(require("url"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _lodash = _interopRequireDefault(require("lodash"));

var _defaults = _interopRequireDefault(require("./defaults"));

var _SiteMapManager = _interopRequireDefault(require("./SiteMapManager"));

var PUBLICPATH = "./public";

var XSLFILE = _path.default.resolve(__dirname, "./static/sitemap.xsl");

var siteUrl;

var runQuery = function runQuery(handler, _ref) {
  var query = _ref.query,
      exclude = _ref.exclude;
  return handler(query).then(function (r) {
    if (r.errors) {
      throw new Error(r.errors.join(", "));
    }

    for (var source in r.data) {
      // Removing excluded paths
      if (r.data[source] && r.data[source].edges && r.data[source].edges.length) {
        r.data[source].edges = r.data[source].edges.filter(function (_ref2) {
          var node = _ref2.node;
          return !exclude.some(function (excludedRoute) {
            var slug = node.slug.replace(/^\/|\/$/, "");
            excludedRoute = excludedRoute.replace(/^\/|\/$/, "");
            return slug.indexOf(excludedRoute) >= 0;
          });
        });
      }
    }

    return r.data;
  });
};

var copyStylesheet =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref3) {
    var siteUrl, indexOutput, siteRegex, data, sitemapStylesheet;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            siteUrl = _ref3.siteUrl, indexOutput = _ref3.indexOutput;
            siteRegex = /(\{\{blog-url\}\})/g; // Get our stylesheet template

            _context.next = 4;
            return _fsExtra.default.readFile(XSLFILE);

          case 4:
            data = _context.sent;
            // Replace the `{{blog-url}}` variable with our real site URL
            sitemapStylesheet = data.toString().replace(siteRegex, _url.default.resolve(siteUrl, indexOutput)); // Save the updated stylesheet to the public folder, so it will be
            // available for the xml sitemap files

            _context.next = 8;
            return _fsExtra.default.writeFile(_path.default.join(PUBLICPATH, "sitemap.xsl"), sitemapStylesheet);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function copyStylesheet(_x) {
    return _ref4.apply(this, arguments);
  };
}();

var serialize = function serialize(_ref5, mapping, pathPrefix) {
  var site = _ref5.site,
      sources = (0, _objectWithoutPropertiesLoose2.default)(_ref5, ["site"]);
  var nodes = [];
  var sourceObject = {};
  siteUrl = site.siteMetadata.siteUrl;

  var _loop = function _loop(source) {
    if (mapping[source].name) {
      var currentSource = sources.hasOwnProperty(source) ? sources[source] : [];

      if (currentSource) {
        sourceObject[mapping[source].name] = [];
        currentSource.edges.map(function (_ref6) {
          var node = _ref6.node;

          if (!node) {
            return;
          } // Add site path prefix and resources prefix to create the correct absolute URL


          var nodePath = _path.default.join(pathPrefix, mapping[source].prefix, node.slug);

          sourceObject[mapping[source].name].push({
            url: _url.default.resolve(siteUrl, nodePath),
            node: node
          });
        });
      }
    }
  };

  for (var source in sources) {
    _loop(source);
  }

  nodes.push(sourceObject); // Add the siteUrl as setup in Gatsby config of the app, so we can create the
  // correct back links in the sitemap

  nodes.push({
    site: [{
      siteUrl: siteUrl
    }]
  });
  return nodes;
};

var onPostBuild =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_ref7, pluginOptions) {
    var graphql, pathPrefix, options, indexOutput, resourcesOutput, mapping, indexSitemapFile, resourcesSitemapFile, queryRecords, manager, indexSiteMap, resourcesSiteMapsArray, resourceType, type;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            graphql = _ref7.graphql, pathPrefix = _ref7.pathPrefix;
            options = _lodash.default.merge(_defaults.default, options, pluginOptions);
            delete options.plugins;
            delete options.createLinkInHead;
            indexOutput = options.indexOutput, resourcesOutput = options.resourcesOutput, mapping = options.mapping;
            indexSitemapFile = _path.default.join(PUBLICPATH, indexOutput);
            resourcesSitemapFile = _path.default.join(PUBLICPATH, resourcesOutput);
            _context3.next = 9;
            return runQuery(graphql, options);

          case 9:
            queryRecords = _context3.sent;
            // Instanciate the Ghost Sitemaps Manager
            manager = new _SiteMapManager.default(options);
            serialize(queryRecords, mapping, pathPrefix).forEach(function (source) {
              var _loop2 = function _loop2(type) {
                source[type].forEach(function (node) {
                  // "feed" the sitemaps manager with our serialized records
                  manager.addUrls(type, node);
                });
              };

              for (var type in source) {
                _loop2(type);
              }
            }); // The siteUrl is only available after we have the returned query results

            options.siteUrl = siteUrl;
            _context3.next = 15;
            return copyStylesheet(options);

          case 15:
            indexSiteMap = manager.getIndexXml(options);
            resourcesSiteMapsArray = [];

            for (resourceType in mapping) {
              type = mapping[resourceType].name;
              resourcesSiteMapsArray.push({
                type: type,
                xml: manager.getSiteMapXml(type, options)
              });
            } // Save the generated xml files in the public folder


            _context3.prev = 18;
            _context3.next = 21;
            return _fsExtra.default.writeFile(indexSitemapFile, indexSiteMap);

          case 21:
            resourcesSiteMapsArray.forEach(
            /*#__PURE__*/
            function () {
              var _ref9 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee2(sitemap) {
                var filePath;
                return _regenerator.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        filePath = resourcesSitemapFile.replace(/:resource/, sitemap.type);
                        _context2.next = 3;
                        return _fsExtra.default.writeFile(filePath, sitemap.xml);

                      case 3:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));

              return function (_x4) {
                return _ref9.apply(this, arguments);
              };
            }());
            _context3.next = 27;
            break;

          case 24:
            _context3.prev = 24;
            _context3.t0 = _context3["catch"](18);
            console.error(_context3.t0);

          case 27:
            return _context3.abrupt("return");

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[18, 24]]);
  }));

  return function onPostBuild(_x2, _x3) {
    return _ref8.apply(this, arguments);
  };
}();

exports.onPostBuild = onPostBuild;