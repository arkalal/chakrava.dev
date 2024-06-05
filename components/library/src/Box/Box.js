import React from "react";
import PropTypes from "prop-types";
import styles from "./Box.module.scss";
import clsx from "clsx";

const Box = ({
  display = "flex",
  flexDirection = "row",
  justifyContent = "flex-start",
  alignItems = "stretch",
  padding = "0",
  paddingTop = "0",
  paddingRight = "0",
  paddingBottom = "0",
  paddingLeft = "0",
  margin = "0",
  marginTop = "0",
  marginRight = "0",
  marginBottom = "0",
  marginLeft = "0",
  width = "auto",
  height = "auto",
  bgColor = "transparent",
  textColor = "inherit",
  border = "none",
  borderRadius = "0",
  boxShadow = "none",
  children,
  className = "",
  ...rest
}) => {
  const boxStyles = {
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
    "--box-box-shadow": boxShadow,
  };

  return (
    <div className={clsx(styles.box, className)} style={boxStyles} {...rest}>
      {children}
    </div>
  );
};

Box.propTypes = {
  display: PropTypes.string,
  flexDirection: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  padding: PropTypes.string,
  paddingTop: PropTypes.string,
  paddingRight: PropTypes.string,
  paddingBottom: PropTypes.string,
  paddingLeft: PropTypes.string,
  margin: PropTypes.string,
  marginTop: PropTypes.string,
  marginRight: PropTypes.string,
  marginBottom: PropTypes.string,
  marginLeft: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  boxShadow: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Box;
