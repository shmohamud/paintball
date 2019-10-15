import React from "react";
import "./Paintball.css";
import PropTypes from "prop-types";
var classNames = require("classnames");

export default function Paintball(props) {
  const { x, y, color } = props;
  let spanClasses = classNames({
    paintball: true
  });

  return (
    <span
      className={spanClasses}
      style={{
        position: "absolute",
        backgroundColor: color,
        left: x+"px",
        top: y+"px"
      }}
    />
  );
}

Paintball.propTypes = {
  color: PropTypes.string,
  x: PropTypes.string,
  y: PropTypes.string
};
