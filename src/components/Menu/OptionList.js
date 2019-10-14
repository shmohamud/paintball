import React from "react";
import Option from './Option'
var classNames = require('classnames')

export default function OptionList() {
  return (
    <div>
      <ul>
        <li><Option title="New Game"/></li>
        <li><Option title="Restart Game"/></li>
        <li><Option title="Game Settings"/></li>
        <li><Option title="Leaderboard"/></li>
      </ul>
    </div>
  );
}
