import React, { Component } from 'react'
import './styles.css'
var classNames = require("classnames");

export default class Target extends Component {
    render() {
        let divClasses = classNames({
            target: true,
          })
        return (
            <div onClick={(e) => this.props.targetHit(e)}className={divClasses} style={{color:'red', top:this.props.top,right:this.props.right}}>
            </div>
        )
    }
}
