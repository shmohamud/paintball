import React, { Component } from "react";
var classNames = require("classnames");

export default class Paintball extends Component {
   
  render() {
    const { x , y, color } = this.props
    let spanClasses = classNames({
      paintball: true
    })

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
}

