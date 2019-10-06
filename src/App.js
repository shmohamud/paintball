import React from "react";
import "./styles.css";
import OptionList from "./OptionList";
import Paintball from "./Paintball";
import Sidebar from "./Sidebar";
import Target from "./Target";
import Timer from "./Timer";
import { thisExpression } from "@babel/types";

class App extends React.Component {
  state = {
    ammunition: "O O O O O O O",
    level: 1,
    levelPassed: false,
    numShots: 0,
    paintballId: 1,
    points: 0,
    secondsRemaining: 60,
    shotCoordinates: [],
    targetCoordinates: ["20em", "35em"],
    x: 0,
    y: 0
  };

  componentDidMount = () => {
    window.addEventListener("click", e => this.onShootPaintball(e));
  };

  componentDidUpdate = (prevProps, prevState) => {
    
    if (this.state.seconds > 0) {
      this.secondsCountdown();
    }
    if(prevState.secondsRemaining < 1){
      alert("Level Complete. Level 2 starts in 5 seconds...");
      this.setState({ levelSuccess: true, shots: this.state.shots + 1 });
      this.resetGameNextLvl();
    }

    if (prevState.points >= 50 && !prevState.levelPassed) {
      alert("Level Complete. Level 2 starts in 5 seconds...");
      this.setState({ levelSuccess: true, shots: this.state.shots + 1 });
      this.resetGameNextLvl();
    }

    if (prevState.ammunition.length === 0 && prevState.levelPassed === false) {
      alert("Uh Oh! You're out of Ammo! Try Again");
      this.setState({ levelFail: true });
      this.resetGameFirstLvl();
    }
  };

  onShootPaintball = e => {
    let { clientX, clientY } = e;
    this.setState({
      ...this.state,
      ammunition: this.state.ammunition
        .split(" ")
        .slice(1)
        .join(" "),
      numShots: this.state.numShots + 1,
      shotCoordinates: [
        ...this.state.shotCoordinates.slice(),
        [clientX, clientY, this.setPaintColor()]
      ],
      x: clientX,
      y: clientY
    });
    this.destroyPaintball();
  };

  onTargetHit = () => {
    const max = 45;
    const min = 5;
    const randNumTop =
      Math.floor(Math.random() * (max - min)).toString() + "em";
    const randNumRight =
      Math.floor(Math.random() * (max - min)).toString() + "em";
    const state = { ...this.state };
    const points = state.points + 10;
    this.setState({
      targetCoordinates: [randNumTop, randNumRight],
      points: points,
      shotCoordinates: []
    });
  };
  destroyPaintball = () => {
    const shotCoordinates = this.state.shotCoordinates.slice(1);
    this.setState({
      ...this.state,
      shotCoordinates: shotCoordinates
    });
  };

  setPaintColor = () => {
    const colors = ["blue", "black", "green", "orange", "purple", "red"];
    const min = 0;
    const max = 5;
    const randNum = Math.floor(Math.random() * (max - min));
    return colors[randNum];
  };

  destroyCountdown = setTimeout(() => {
    this.destroyPaintball();
  }, 5000);


  secondsCountdown = setTimeout(() => {
    const { secondsRemaining } = this.state;
    this.setState({ secondsRemaining: secondsRemaining - 1 });
  }, 1000);

  resetGameFirstLvl = () => {
    clearTimeout(this.destroyCountdown)
    clearTimeout(this.secondsCountdown)
    
    this.setState({
      ...this.state,
      ammunition: "O O O O O O O",
      levelSuccess: false,
      numShots: 0,
      points: 0,
      shotCoordinates: [],
      secondsRemaining: 60
    });
  };

  resetGameNextLvl = () => {
    this.setState({
      ...this.state,
      ammunition: "O O O O O O O",
      levelSuccess: false,
      levelFail: false,
      numShots: 0,
      points: 0,
      level: this.state.level + 1,
      shotCoordinates: [],
      secondsRemaining: 60
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
          targetHit={this.onTargetHit}
        />
        <Timer
          seconds={this.state.secondsRemaining}
          fail={this.state.levelFailure}
          success={this.state.levelSuccess}
        />
        <Sidebar
          ammo={this.state.ammunition}
          numShots={this.state.numShots}
          points={this.state.points}
          resetGame={this.resetGameFirstLvl}
        />
      </div>
    );
  }
}

export default App;
