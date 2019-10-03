import React, { Component } from "react";
var classNames = require("classnames");

export default class Paintball extends Component {
  randomColor = () => {
    let colors = ["blue", "black", "green", "orange", "purple", "red"];
    let min = 0;
    let max = 5;
    let randNum = Math.floor(Math.random() * (max - min));
    return colors[randNum];
  };
  render() {
    let spanClasses = classNames({
      paintball: true
    });

    return (
      <span
        className={spanClasses}
        style={{
          position: "absolute",
          backgroundColor: this.randomColor(),
          left: this.props.x,
          top: this.props.y
        }}
      />
    );
  }
}
