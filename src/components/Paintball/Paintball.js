import React from "react";
import "./Paintball.css";
import PropTypes from "prop-types";
var classNames = require("classnames");

export default function Paintball(props) {
  const { x, y, color } = props;
  console.log(x, y, color);
  let spanClasses = classNames({
    paintball: true
  });

  return (
    <span
      className={spanClasses}
      style={{
        position: "absolute",
        backgroundColor: color,
        left: x,
        top: y
      }}
    />
  );
}

Paintball.propTypes = {
  color: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number
};
