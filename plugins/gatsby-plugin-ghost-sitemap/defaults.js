"use strict";

exports.__esModule = true;
exports.default = void 0;
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
var _default = defaultOptions;
exports.default = _default;