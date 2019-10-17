import React, {useState} from "react";
import useInterval from '../../hooks/clockHooks'
import "./CountdownClock.css";
import { Spinner } from "react-bootstrap";
import PropTypes from 'prop-types'
var classNames = require("classnames");

export default function CountdownClock (props){
 
    let [count, setCount] = useState(15);
  
    useInterval(() => {
      setCount(count - 1);
    }, 1000);
  
 const classnames = classNames({
    clock: true
  });
    return (
      <div>
        <p style={{ textAlign: "center" }}>Seconds Remaining</p>
        <Spinner className={classnames}>
          <div style={{ textAlign: "center" }}>
            <span>{count}</span>
          </div>
        </Spinner>
      </div>
    );
}

CountdownClock.propTypes = {
  secondsRemaining:PropTypes.number
};
