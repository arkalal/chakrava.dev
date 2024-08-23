import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import clsx from "clsx";

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
