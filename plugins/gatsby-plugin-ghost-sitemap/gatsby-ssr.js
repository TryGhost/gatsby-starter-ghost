"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _gatsby = require("gatsby");

var _internals = require("./internals");

var _jsxFileName = "/Users/aileen/code/gatsby-starter-ghost/plugins/gatsby-plugin-ghost-sitemap/src/gatsby-ssr.js";

exports.onRenderBody = function (_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents;

  var _defaultOptions$plugi = (0, _extends2.default)({}, _internals.defaultOptions, pluginOptions),
      output = _defaultOptions$plugi.output,
      createLinkInHead = _defaultOptions$plugi.createLinkInHead;

  if (!createLinkInHead) {
    return;
  }

  if (output.charAt(0) !== "/") {
    output = "/" + output;
  }

  setHeadComponents([_react.default.createElement("link", {
    key: "gatsby-plugin-ghost-sitemap",
    rel: "sitemap",
    type: "application/xml",
    href: (0, _gatsby.withPrefix)(output),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  })]);
};