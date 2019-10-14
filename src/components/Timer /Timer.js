import React from "react";
import "./Timer.css";
import { Spinner } from "react-bootstrap";
import PropTypes from 'prop-types'
var classNames = require("classnames");

export default function Timer (props){

const {secondsRemaining} = props
 const classnames = classNames({
    timer: true
  });
    return (
      <div>
        <p style={{ textAlign: "center" }}>Seconds Remaining</p>
        <Spinner className={classnames}>
          <div style={{ textAlign: "center" }}>
            <span>{secondsRemaining}</span>
          </div>
        </Spinner>
      </div>
    );
}

Timer.propTypes = {
  secondsRemaining:PropTypes.number
};
