import React from "react";
import "./styles.css";
import Paintball from "./Paintball";
import Scoreboard from "./Scoreboard";
import Target from "./Target";
import Timer from "./Timer"

class App extends React.Component {
  state = {
    x: 0,
    y: 0,
    numShots: 0,
    points: 0,
    seconds:60,
    shotCoordinates: [],
    targetCoordinates: ["20em", "35em"]
  };

  componentDidMount() {
    window.addEventListener("click", e => this.onShootPaintball(e));
  }

  onShootPaintball = e => {
    let { clientX, clientY } = e;
    let state = { ...this.state };
    this.setState({
      ...state,
      x: clientX,
      y: clientY,
      numShots: (state.numShots += 1),
      shotCoordinates: [
        ...state.shotCoordinates.slice(),
        [clientX, clientY, this.setPaintColor()]
      ]
    });
    this.destroyPaintball();
  };

  onTargetHit = () => {
    const max = 35;
    const min = 5;
    const randNumTop =
      Math.floor(Math.random() * (max - min)).toString() + "em";
    const randNumRight =
      Math.floor(Math.random() * (max - min)).toString() + "em";
    let state = { ...this.state };
    let points = state.points + 10
    this.setState({
      targetCoordinates: [randNumTop, randNumRight],
      points: points,
      shotCoordinates: []
    });
  };

  targetHit = e => {
    e.persist();
    this.onTargetHit();
    console.log(e);
  };

  destroyPaintball = () => {
    setTimeout(() => {
      const state = { ...this.state };
      const shotCoordinates = state.shotCoordinates.slice(1);
      this.setState({
        ...state,
        shotCoordinates: shotCoordinates
      });
    }, 5000);
  };

  setPaintColor = () => {
    const colors = ["blue", "black", "green", "orange", "purple", "red"];
    const min = 0;
    const max = 5;
    const randNum = Math.floor(Math.random() * (max - min));
    return colors[randNum];
  };

  handleClickResetGame = () => {
    let state = { ...this.state };
    this.setState({
      ...state,
      numShots: -1,
      points:0,
      shotCoordinates: []
    });
  };

  render() {
    return (
      <div>
        {this.state.shotCoordinates.map(shotCoords => (
          <Paintball
            x={shotCoords[0]}
            y={shotCoords[1]}
            color={shotCoords[2]}
          />
        ))}
        <Target
          top={this.state.targetCoordinates[0]}
          right={this.state.targetCoordinates[1]}
          targetHit={this.targetHit}
        />
        <Timer time={this.state.time}/>
        <Scoreboard
          numShots={this.state.numShots}
          points={this.state.points}
          resetGame={this.handleClickResetGame}
        />
      </div>
    );
  }
}

export default App;
