import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import clsx from "clsx";

const Button = ({
  padding = "10px 20px",
  margin = "5px",
  bgColor = "blue",
  textColor = "white",
  border = "1px solid black",
  borderRadius = "4px",
  width = "auto",
  height = "auto",
  boxShadow = "none",
  hoverBgColor = "darkblue",
  hoverTextColor = "white",
  children,
  className = "",
  ...rest
}) => {
  const buttonStyles = {
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
    "--button-hover-text-color": hoverTextColor,
  };

  return (
    <button
      className={clsx(styles.button, className)}
      style={buttonStyles}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  padding: PropTypes.string,
  margin: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  boxShadow: PropTypes.string,
  hoverBgColor: PropTypes.string,
  hoverTextColor: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
