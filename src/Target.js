import React, { Component } from 'react'
import './styles.css'
var classNames = require("classnames");

export default class Target extends Component {   
    render() {
        const {
            targetHit, right, top
          } = this.props
        let divClasses = classNames({
            target: true,
          })
        return (
            <div onClick={()=> targetHit()}className={divClasses} style={{color:'red', top:top,right:right}}>
            </div>
        )
    }
}
