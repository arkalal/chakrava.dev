"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ButtonModule = _interopRequireDefault(require("./Button.module.scss"));
var _clsx = _interopRequireDefault(require("clsx"));
var _excluded = ["padding", "margin", "bgColor", "textColor", "border", "borderRadius", "width", "height", "boxShadow", "hoverBgColor", "hoverTextColor", "children", "className"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], t.indexOf(o) >= 0 || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
/**
 * Button component for user interactions.
 *
 * @param {object} props - Props object
 * @param {string} [props.padding="10px 20px"] - Padding for the button
 * @param {string} [props.margin="5px"] - Margin for the button
 * @param {string} [props.bgColor="blue"] - Background color of the button
 * @param {string} [props.textColor="white"] - Text color of the button
 * @param {string} [props.border="1px solid black"] - Border style of the button
 * @param {string} [props.borderRadius="4px"] - Border radius of the button
 * @param {string} [props.width="auto"] - Width of the button
 * @param {string} [props.height="auto"] - Height of the button
 * @param {string} [props.boxShadow="none"] - Box shadow of the button
 * @param {string} [props.hoverBgColor="darkblue"] - Background color on hover
 * @param {string} [props.hoverTextColor="white"] - Text color on hover
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className=""] - Additional class names for the button
 */
var Button = function Button(_ref) {
  var _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? "10px 20px" : _ref$padding,
    _ref$margin = _ref.margin,
    margin = _ref$margin === void 0 ? "5px" : _ref$margin,
    _ref$bgColor = _ref.bgColor,
    bgColor = _ref$bgColor === void 0 ? "blue" : _ref$bgColor,
    _ref$textColor = _ref.textColor,
    textColor = _ref$textColor === void 0 ? "white" : _ref$textColor,
    _ref$border = _ref.border,
    border = _ref$border === void 0 ? "1px solid black" : _ref$border,
    _ref$borderRadius = _ref.borderRadius,
    borderRadius = _ref$borderRadius === void 0 ? "4px" : _ref$borderRadius,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "auto" : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "auto" : _ref$height,
    _ref$boxShadow = _ref.boxShadow,
    boxShadow = _ref$boxShadow === void 0 ? "none" : _ref$boxShadow,
    _ref$hoverBgColor = _ref.hoverBgColor,
    hoverBgColor = _ref$hoverBgColor === void 0 ? "darkblue" : _ref$hoverBgColor,
    _ref$hoverTextColor = _ref.hoverTextColor,
    hoverTextColor = _ref$hoverTextColor === void 0 ? "white" : _ref$hoverTextColor,
    children = _ref.children,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    rest = _objectWithoutProperties(_ref, _excluded);
  var buttonStyles = {
    "--button-padding": padding,
    "--button-margin": margin,
    "--button-bg-color": bgColor,
    "--button-text-color": textColor,
    "--button-border": border,
    "--button-border-radius": borderRadius,
    "--button-width": width,
    "--button-height": height,
    "--button-box-shadow": boxShadow,
    "--button-hover-bg-color": hoverBgColor,
    "--button-hover-text-color": hoverTextColor
  };
  return /*#__PURE__*/_react["default"].createElement("button", _extends({
    className: (0, _clsx["default"])(_ButtonModule["default"].button, className),
    style: buttonStyles
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
  boxShadow: _propTypes["default"].string,
  hoverBgColor: _propTypes["default"].string,
  hoverTextColor: _propTypes["default"].string,
  children: _propTypes["default"].node,
  className: _propTypes["default"].string
};
var _default = exports["default"] = Button;