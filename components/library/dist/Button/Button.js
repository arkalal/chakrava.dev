"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ButtonModule = _interopRequireDefault(require("./Button.module.scss"));
var _clsx = _interopRequireDefault(require("clsx"));
var _excluded = ["padding", "margin", "bgColor", "textColor", "border", "borderRadius", "width", "height", "hoverBgColor", "hoverTextColor", "children", "className"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], t.indexOf(o) >= 0 || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
var Button = function Button(_ref) {
  var padding = _ref.padding,
    margin = _ref.margin,
    bgColor = _ref.bgColor,
    textColor = _ref.textColor,
    border = _ref.border,
    borderRadius = _ref.borderRadius,
    width = _ref.width,
    height = _ref.height,
    hoverBgColor = _ref.hoverBgColor,
    hoverTextColor = _ref.hoverTextColor,
    children = _ref.children,
    className = _ref.className,
    rest = _objectWithoutProperties(_ref, _excluded);
  var buttonStyle = {
    "--button-padding": padding,
    "--button-margin": margin,
    "--button-bg-color": bgColor,
    "--button-text-color": textColor,
    "--button-border": border,
    "--button-border-radius": borderRadius,
    "--button-width": width,
    "--button-height": height,
    "--button-hover-bg-color": hoverBgColor,
    "--button-hover-text-color": hoverTextColor
  };
  return /*#__PURE__*/_react["default"].createElement("button", _extends({
    className: (0, _clsx["default"])(_ButtonModule["default"].button, className),
    style: buttonStyle
  }, rest), children);
};
Button.propTypes = {
  padding: _propTypes["default"].string,
  margin: _propTypes["default"].string,
  bgColor: _propTypes["default"].string,
  textColor: _propTypes["default"].string,
  border: _propTypes["default"].string,
  borderRadius: _propTypes["default"].string,
  width: _propTypes["default"].string,
  height: _propTypes["default"].string,
  hoverBgColor: _propTypes["default"].string,
  hoverTextColor: _propTypes["default"].string,
  children: _propTypes["default"].node,
  className: _propTypes["default"].string
};
Button.defaultProps = {
  padding: "10px 20px",
  margin: "5px",
  bgColor: "blue",
  textColor: "white",
  border: "1px solid black",
  borderRadius: "4px",
  width: "auto",
  height: "auto",
  hoverBgColor: "darkblue",
  hoverTextColor: "white",
  className: ""
};
var _default = exports["default"] = Button;