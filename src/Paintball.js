import React, { Component } from "react";
var classNames = require("classnames");

export default class Paintball extends Component {

  render() {
    let spanClasses = classNames({
      paintball: true
    })

    return (
      <span
        className={spanClasses}
        style={{
          position: "absolute",
          backgroundColor: this.props.color,
          left: this.props.x,
          top: this.props.y
        }}
      />
    );
  }
}
