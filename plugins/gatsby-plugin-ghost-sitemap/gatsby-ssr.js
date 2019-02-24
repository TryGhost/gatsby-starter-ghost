"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _gatsby = require("gatsby");

var _internals = require("./internals");

exports.onRenderBody = function (_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents;

  var _defaultOptions$plugi = (0, _extends2.default)({}, _internals.defaultOptions, pluginOptions),
      indexOutput = _defaultOptions$plugi.indexOutput,
      createLinkInHead = _defaultOptions$plugi.createLinkInHead;

  if (!createLinkInHead) {
    return;
  }

  if (indexOutput.charAt(0) !== "/") {
    indexOutput = "/" + indexOutput;
  }

  setHeadComponents([_react.default.createElement("link", {
    key: "gatsby-plugin-ghost-sitemap",
    rel: "sitemap",
    type: "application/xml",
    href: (0, _gatsby.withPrefix)(indexOutput)
  })]);
};