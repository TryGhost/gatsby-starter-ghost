"use strict";

exports.__esModule = true;
exports.defaultOptions = exports.runQuery = void 0;

var runQuery = function runQuery(handler, query, excludes) {
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
        });
      }
    }

    return r.data;
  });
};

exports.runQuery = runQuery;
var defaultOptions = {
  query: "\n    {\n      site {\n        siteMetadata {\n          siteUrl\n        }\n      }\n      allGhostPost(sort: {order: ASC, fields: published_at}) {\n        edges {\n            node {\n                id\n                slug\n                updated_at\n                created_at\n                feature_image\n            }\n        }\n      }\n      allGhostPage(sort: {order: ASC, fields: published_at}) {\n        edges {\n            node {\n                id\n                slug\n                updated_at\n                created_at\n                feature_image\n            }\n        }\n      }\n      allGhostTag(sort: {order: ASC, fields: name}) {\n        edges {\n            node {\n                id\n                slug\n                feature_image\n            }\n        }\n      }\n      allGhostAuthor(sort: {order: ASC, fields: name}) {\n        edges {\n            node {\n                id\n                slug\n                profile_image\n            }\n        }\n      }\n  }",
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
  exclude: ["/dev-404-page", "/404", "/404.html", "/offline-plugin-app-shell-fallback", "/data-schema", "/data-schema-author", "/data-schema-page"],
  createLinkInHead: true
};
exports.defaultOptions = defaultOptions;