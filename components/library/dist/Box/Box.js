"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _BoxModule = _interopRequireDefault(require("./Box.module.scss"));
var _clsx = _interopRequireDefault(require("clsx"));
var _excluded = ["display", "flexDirection", "justifyContent", "alignItems", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "width", "height", "bgColor", "textColor", "border", "borderRadius", "boxShadow", "children", "className"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], t.indexOf(o) >= 0 || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
var Box = function Box(_ref) {
  var _ref$display = _ref.display,
    display = _ref$display === void 0 ? "flex" : _ref$display,
    _ref$flexDirection = _ref.flexDirection,
    flexDirection = _ref$flexDirection === void 0 ? "row" : _ref$flexDirection,
    _ref$justifyContent = _ref.justifyContent,
    justifyContent = _ref$justifyContent === void 0 ? "flex-start" : _ref$justifyContent,
    _ref$alignItems = _ref.alignItems,
    alignItems = _ref$alignItems === void 0 ? "stretch" : _ref$alignItems,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? "0" : _ref$padding,
    _ref$paddingTop = _ref.paddingTop,
    paddingTop = _ref$paddingTop === void 0 ? "0" : _ref$paddingTop,
    _ref$paddingRight = _ref.paddingRight,
    paddingRight = _ref$paddingRight === void 0 ? "0" : _ref$paddingRight,
    _ref$paddingBottom = _ref.paddingBottom,
    paddingBottom = _ref$paddingBottom === void 0 ? "0" : _ref$paddingBottom,
    _ref$paddingLeft = _ref.paddingLeft,
    paddingLeft = _ref$paddingLeft === void 0 ? "0" : _ref$paddingLeft,
    _ref$margin = _ref.margin,
    margin = _ref$margin === void 0 ? "0" : _ref$margin,
    _ref$marginTop = _ref.marginTop,
    marginTop = _ref$marginTop === void 0 ? "0" : _ref$marginTop,
    _ref$marginRight = _ref.marginRight,
    marginRight = _ref$marginRight === void 0 ? "0" : _ref$marginRight,
    _ref$marginBottom = _ref.marginBottom,
    marginBottom = _ref$marginBottom === void 0 ? "0" : _ref$marginBottom,
    _ref$marginLeft = _ref.marginLeft,
    marginLeft = _ref$marginLeft === void 0 ? "0" : _ref$marginLeft,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "auto" : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "auto" : _ref$height,
    _ref$bgColor = _ref.bgColor,
    bgColor = _ref$bgColor === void 0 ? "transparent" : _ref$bgColor,
    _ref$textColor = _ref.textColor,
    textColor = _ref$textColor === void 0 ? "inherit" : _ref$textColor,
    _ref$border = _ref.border,
    border = _ref$border === void 0 ? "none" : _ref$border,
    _ref$borderRadius = _ref.borderRadius,
    borderRadius = _ref$borderRadius === void 0 ? "0" : _ref$borderRadius,
    _ref$boxShadow = _ref.boxShadow,
    boxShadow = _ref$boxShadow === void 0 ? "none" : _ref$boxShadow,
    children = _ref.children,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    rest = _objectWithoutProperties(_ref, _excluded);
  var boxStyles = {
    "--box-display": display,
    "--box-flex-direction": flexDirection,
    "--box-justify-content": justifyContent,
    "--box-align-items": alignItems,
    "--box-padding": padding,
    "--box-padding-top": paddingTop,
    "--box-padding-right": paddingRight,
    "--box-padding-bottom": paddingBottom,
    "--box-padding-left": paddingLeft,
    "--box-margin": margin,
    "--box-margin-top": marginTop,
    "--box-margin-right": marginRight,
    "--box-margin-bottom": marginBottom,
    "--box-margin-left": marginLeft,
    "--box-width": width,
    "--box-height": height,
    "--box-bg-color": bgColor,
    "--box-text-color": textColor,
    "--box-border": border,
    "--box-border-radius": borderRadius,
    "--box-box-shadow": boxShadow
  };
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: (0, _clsx["default"])(_BoxModule["default"].box, className),
    style: boxStyles
  }, rest), children);
};
Box.propTypes = {
  display: _propTypes["default"].string,
  flexDirection: _propTypes["default"].string,
  justifyContent: _propTypes["default"].string,
  alignItems: _propTypes["default"].string,
  padding: _propTypes["default"].string,
  paddingTop: _propTypes["default"].string,
  paddingRight: _propTypes["default"].string,
  paddingBottom: _propTypes["default"].string,
  paddingLeft: _propTypes["default"].string,
  margin: _propTypes["default"].string,
  marginTop: _propTypes["default"].string,
  marginRight: _propTypes["default"].string,
  marginBottom: _propTypes["default"].string,
  marginLeft: _propTypes["default"].string,
  width: _propTypes["default"].string,
  height: _propTypes["default"].string,
  bgColor: _propTypes["default"].string,
  textColor: _propTypes["default"].string,
  border: _propTypes["default"].string,
  borderRadius: _propTypes["default"].string,
  boxShadow: _propTypes["default"].string,
  children: _propTypes["default"].node,
  className: _propTypes["default"].string
};
var _default = exports["default"] = Box;