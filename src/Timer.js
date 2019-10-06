import React from "react";
import { Spinner } from "react-bootstrap";
import "./styles.css";

export default class Timer extends React.Component {
  
  classNames = require("classnames"); 
  
  classnames = this.classNames({
    timer: true
  });

  render() {
    const {seconds} = this.props;
    return (
      <div>
        <p style={{ textAlign: "center" }}>Seconds Remaining</p>
        <Spinner className={this.classnames} animation="border">
          <div style={{ textAlign: "center" }}>
            <span>{seconds}</span>
          </div>
        </Spinner>
      </div>
    );
  }
}
