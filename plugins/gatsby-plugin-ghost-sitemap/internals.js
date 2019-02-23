"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.defaultOptions = exports.runQuery = exports.writeFile = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _pify = _interopRequireDefault(require("pify"));

var _minimatch = _interopRequireDefault(require("minimatch"));

var withoutTrailingSlash = function withoutTrailingSlash(path) {
  if (path === "/") {
    return path;
  }

  return path.replace(/\/$/, "");
};

var writeFile = (0, _pify.default)(_fs.default.writeFile);
exports.writeFile = writeFile;

var runQuery = function runQuery(handler, query, excludes, pathPrefix) {
  return handler(query).then(function (r) {
    if (r.errors) {
      throw new Error(r.errors.join(", "));
    } // // Removing excluded paths
    // r.data.allSitePage.edges = r.data.allSitePage.edges.filter(
    //     page => !excludes.some(excludedRoute => minimatch(withoutTrailingSlash(page.node.path), excludedRoute)
    //     )
    // )
    // // Add path prefix
    // r.data.allSitePage.edges = r.data.allSitePage.edges.map((page) => {
    //     // uses `normalizePath` logic from `gatsby-link`
    //     page.node.path = (pathPrefix + page.node.path).replace(/^\/\//g, `/`)
    //     return page
    // })


    return r.data;
  });
};

exports.runQuery = runQuery;
var defaultOptions = {
  query: "\n    {\n      site {\n        siteMetadata {\n          siteUrl\n        }\n      }\n      allGhostPost(\n        sort: {order: ASC, fields: published_at},\n        filter: {slug: {ne: \"data-schema\"}}\n      ) {\n        edges {\n            node {\n                slug\n            }\n        }\n      }\n      allGhostPage(\n        sort: {order: ASC, fields: published_at},\n        filter: {slug: {ne: \"data-schema-page\"}}\n      ) {\n        edges {\n            node {\n                slug\n            }\n        }\n      }\n      allGhostTag(\n        sort: {order: ASC, fields: name},\n        filter: {slug: {ne: \"data-schema\"}}\n      ) {\n        edges {\n            node {\n                slug\n            }\n        }\n      }\n      allGhostAuthor(\n        sort: {order: ASC, fields: name},\n        filter: {slug: {ne: \"data-schema-author\"}}\n      ) {\n        edges {\n            node {\n                slug\n            }\n        }\n      }\n  }",
  output: "/sitemap.xml",
  mapping: {
    allGhostPost: {
      name: "posts",
      prefix: "/"
    },
    allGhostTag: {
      name: "tags",
      prefix: "tag"
    },
    allGhostAuthor: {
      name: "authors",
      prefix: "author"
    },
    allGhosPage: {
      name: "pages",
      prefix: "/"
    }
  },
  exclude: ["/dev-404-page", "/404", "/404.html", "/offline-plugin-app-shell-fallback"],
  createLinkInHead: true
};
exports.defaultOptions = defaultOptions;