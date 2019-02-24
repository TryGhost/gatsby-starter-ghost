"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.onPostBuild = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _url = _interopRequireDefault(require("url"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _internals = require("./internals");

var _SiteMapManager = _interopRequireDefault(require("./SiteMapManager"));

var publicPath = "./public";

var xslFile = _path.default.resolve(__dirname, "./static/sitemap.xsl");

var siteUrl;

var copyStylesheet =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var siteRegex, data, sitemapStylesheet;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            siteRegex = /(\{\{blog-url\}\})/g; // Get our stylesheet template

            _context.next = 3;
            return _fsExtra.default.readFile(xslFile);

          case 3:
            data = _context.sent;
            // Replace the `{{blog-url}}` variable with our real site URL
            sitemapStylesheet = data.toString().replace(siteRegex, siteUrl); // Save the updated stylesheet to the public folder, so it will be
            // available for the xml sitemap files

            _context.next = 7;
            return _fsExtra.default.writeFile(_path.default.join(publicPath, "sitemap.xsl"), sitemapStylesheet);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function copyStylesheet() {
    return _ref.apply(this, arguments);
  };
}();

var serialize = function serialize(_ref2, mapping, pathPrefix) {
  var site = _ref2.site,
      sources = (0, _objectWithoutPropertiesLoose2.default)(_ref2, ["site"]);
  var nodes = [];
  var sourceObject = {};
  siteUrl = site.siteMetadata.siteUrl;

  var _loop = function _loop(source) {
    if (mapping[source].name) {
      var currentSource = sources.hasOwnProperty(source) ? sources[source] : [];

      if (currentSource) {
        sourceObject[mapping[source].name] = [];
        currentSource.edges.map(function (_ref3) {
          var node = _ref3.node;

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
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(_ref4, pluginOptions) {
    var graphql, pathPrefix, options, _defaultOptions$optio, query, indexOutput, resourcesOutput, exclude, mapping, indexSitemapFile, resourcesSitemapFile, excludeOptions, queryRecords, manager, indexSiteMap, resourcesSiteMapsArray, resourceType, type;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            graphql = _ref4.graphql, pathPrefix = _ref4.pathPrefix;
            options = (0, _extends2.default)({}, pluginOptions);
            delete options.plugins;
            delete options.createLinkInHead;
            _defaultOptions$optio = (0, _extends2.default)({}, _internals.defaultOptions, options), query = _defaultOptions$optio.query, indexOutput = _defaultOptions$optio.indexOutput, resourcesOutput = _defaultOptions$optio.resourcesOutput, exclude = _defaultOptions$optio.exclude, mapping = _defaultOptions$optio.mapping;
            indexSitemapFile = _path.default.join(publicPath, indexOutput);
            resourcesSitemapFile = _path.default.join(publicPath, resourcesOutput); // Paths we're excluding...

            excludeOptions = exclude.concat(_internals.defaultOptions.exclude);
            _context3.next = 10;
            return (0, _internals.runQuery)(graphql, query, excludeOptions);

          case 10:
            queryRecords = _context3.sent;
            // Instanciate the Ghost Sitemaps Manager
            manager = new _SiteMapManager.default();
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
            });
            _context3.next = 15;
            return copyStylesheet();

          case 15:
            indexSiteMap = manager.getIndexXml();
            resourcesSiteMapsArray = [];

            for (resourceType in mapping) {
              type = mapping[resourceType].name;
              resourcesSiteMapsArray.push({
                type: type,
                xml: manager.getSiteMapXml(type)
              });
            } // Save the generated xml files in the public folder


            _context3.prev = 18;
            _context3.next = 21;
            return _fsExtra.default.writeFile(indexSitemapFile, indexSiteMap);

          case 21:
            resourcesSiteMapsArray.forEach(
            /*#__PURE__*/
            function () {
              var _ref6 = (0, _asyncToGenerator2.default)(
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

              return function (_x3) {
                return _ref6.apply(this, arguments);
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

  return function onPostBuild(_x, _x2) {
    return _ref5.apply(this, arguments);
  };
}();

exports.onPostBuild = onPostBuild;