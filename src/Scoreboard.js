import React, { Component } from "react";
import{Card, Button} from 'react-bootstrap'
import "./styles.css";
var classNames = require("classnames");

export default class Scoreboard extends Component {
  render() {
    let divClasses = classNames({
        scoreboard: true
      })
    return (
      <div className={divClasses}>
        <Card>
          <Card.Img variant="top" width="70px" height="70px" src="https://image.shutterstock.com/image-vector/paintball-player-silhouette-260nw-765076153.jpg" />
          <Card.Body>
            <Card.Title>Shot Count</Card.Title>
            <Card.Text>
             {this.props.numShots}
            </Card.Text>
            <Card.Title>Points</Card.Title>
            <Card.Text>
             {this.props.points}
            </Card.Text>
            <Button onClick={this.props.resetGame}variant="primary">Reset</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
