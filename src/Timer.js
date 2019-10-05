import React from "react";
import "./styles.css";
import { Spinner } from "react-bootstrap";

export default class Timer extends React.Component {
  classNames = require("classnames");

  componentDidMount() {
    this.props.decrementSeconds();
  }

  classnames = this.classNames({
    timer: true
  });

  componentDidUpdate(prevProps) {
    if (prevProps.seconds !== this.props.seconds && this.props.seconds > 0) {
      this.props.decrementSeconds();
    }
  }

  render() {
    return (
      <div>
        <p style={{ textAlign: "center" }}>Seconds Remaining</p>

        <Spinner className={this.classnames}>
          <div style={{ textAlign: "center" }}>
            <span>{this.props.seconds}</span>
          </div>
        </Spinner>
      </div>
    );
  }
}
