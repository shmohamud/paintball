import React from "react";
import PropTypes from 'prop-types'
import { Card, Button } from "react-bootstrap";
import "./Sidebar.css";
var classNames = require("classnames");

export default function Sidebar(props) {
  const { ammo, shotCount, points, resetGame } = props;
  let divClasses = classNames({
    sidebar: true
  });
  return (
    <div className={divClasses}>
      <Card>
        <Card.Img
          variant="top"
          width="70px"
          height="70px"
          src="https://image.shutterstock.com/image-vector/paintball-player-silhouette-260nw-765076153.jpg"
        />
        <Card.Body>
          <Card.Title>Shot Count</Card.Title>
          <Card.Text>{shotCount}</Card.Text>
          <Card.Title>Points</Card.Title>
          <Card.Text>{points}</Card.Text>
          <Card.Title>Ammo</Card.Title>
          <Card.Text>{ammo}</Card.Text>
          <Button onClick={resetGame} variant="primary">
            Reset
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

Sidebar.propTypes = {
  ammo: PropTypes.string,
  numShots: PropTypes.number,
  points: PropTypes.number,
  resetGame: PropTypes.func.isRequired
};

