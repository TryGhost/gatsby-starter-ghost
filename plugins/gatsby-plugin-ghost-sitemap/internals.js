"use strict";

exports.__esModule = true;
exports.defaultOptions = exports.runQuery = void 0;

var runQuery = function runQuery(handler, query, excludes, pathPrefix) {
  return handler(query).then(function (r) {
    if (r.errors) {
      throw new Error(r.errors.join(", "));
    }

    for (var source in r.data) {
      // Removing excluded paths
      if (r.data[source] && r.data[source].edges && r.data[source].edges.length) {
        r.data[source].edges = r.data[source].edges.filter(function (_ref) {
          var node = _ref.node;
          return !excludes.some(function (excludedRoute) {
            var slug = node.slug.replace(/^\/|\/$/, "");
            excludedRoute = excludedRoute.replace(/^\/|\/$/, "");
            return slug.indexOf(excludedRoute) >= 0;
          });
        }); // Add path prefix

        r.data[source].edges = r.data[source].edges.map(function (_ref2) {
          var node = _ref2.node;
          // uses `normalizePath` logic from `gatsby-link`
          node.path = (pathPrefix + node.slug).replace(/^\/\//g, "/");
          return node;
        });
      }
    }

    return r.data;
  });
};

exports.runQuery = runQuery;
var defaultOptions = {
  query: "\n    {\n      site {\n        siteMetadata {\n          siteUrl\n        }\n      }\n      allGhostPost(\n        sort: {order: ASC, fields: published_at},\n        filter: {slug: {ne: \"data-schema\"}}\n      ) {\n        edges {\n            node {\n                id\n                slug\n                updated_at\n                created_at\n                feature_image\n            }\n        }\n      }\n      allGhostPage(\n        sort: {order: ASC, fields: published_at},\n        filter: {slug: {ne: \"data-schema-page\"}}\n      ) {\n        edges {\n            node {\n                id\n                slug\n                updated_at\n                created_at\n                feature_image\n            }\n        }\n      }\n      allGhostTag(\n        sort: {order: ASC, fields: name},\n        filter: {slug: {ne: \"data-schema\"}}\n      ) {\n        edges {\n            node {\n                id\n                slug\n                feature_image\n            }\n        }\n      }\n      allGhostAuthor(\n        sort: {order: ASC, fields: name},\n        filter: {slug: {ne: \"data-schema-author\"}}\n      ) {\n        edges {\n            node {\n                id\n                slug\n                profile_image\n            }\n        }\n      }\n  }",
  indexOutput: "/sitemap.xml",
  resourcesOutput: "/sitemap-:resource.xml",
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
    allGhostPage: {
      name: "pages",
      prefix: "/"
    }
  },
  exclude: ["/dev-404-page", "/404", "/404.html", "/offline-plugin-app-shell-fallback"],
  createLinkInHead: true
};
exports.defaultOptions = defaultOptions;