import React from "react";
import PropTypes from "prop-types";
import "./Target.css";
var classNames = require("classnames");

export default function Target(props) {
  const { targetHit, top, right } = props;
  let divClasses = classNames({
    target: true
  });
  return (
    <div
      onClick={e => targetHit(e)}
      className={divClasses}
      style={{ color: "red", top: top, right: right }}
    ></div>
  );
}

Target.propTypes = {
  top: PropTypes.string,
  right: PropTypes.string
};
