import React from "react";
import Paintball from "./components/Paintball/Paintball";
import Sidebar from "./components/Sidebar/Sidebar";
import Target from "./components/Target/Target";
import Timer from "./components/Timer /Timer";

class App extends React.Component {
  state = {
    ammunition: "O O O O",
    secondsRemaining: 15,
    x: 0,
    y: 0,
    shotCoordinates: [],
    targetCoordinates: ["20em", "35em"],
    numShots: 0,
    points: 0,
  };

  componentDidMount() {
    window.addEventListener("click", e => this.onShootPaintball(e));
  }

  onShootPaintball = e => {
    let { clientX, clientY } = e;
    let state = { ...this.state };
    this.setState({
      ...state,
      ammunition: state.ammunition
        .split(" ")
        .slice(1)
        .join(" "),
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

  onTargetHit = () => {
    const {top, right} = this.getRandomCoordinates()
    const state = { ...this.state };
    const points = state.points + 10;
    this.setState({
      targetCoordinates: [top, right],
      points: points,
      shotCoordinates: []
    });
  }

  getRandomCoordinates = () => {
    const max = 35;
    const min = 5;
    const randNumTop = Math.floor(Math.random() * (max - min)).toString() + "em";
    const randNumRight = Math.floor(Math.random() * (max - min)).toString() + "em";
      return {top: randNumTop, right:randNumRight}
  }

  setPaintColor = () => {
    const colors = ["blue", "black", "green", "orange", "purple", "red"];
    const min = 0;
    const max = 5;
    const randNum = Math.floor(Math.random() * (max - min));
    return colors[randNum];
  };

  decrementSeconds = () => {
    if (this.state.secondsRemaining) {
      setTimeout(() => {
        let { secondsRemaining } = this.state;
        console.log(this.state.seconds, this.state);
        this.setState(() => ({ secondsRemaining: secondsRemaining - 1 }));
      }, 1000);
    }
  };

  handleClickResetGame = () => {
    const state = { ...this.state };
    this.setState({
      ...state,
      ammunition: "O O O O O",
      numShots: 0,
      points: 0,
      shotCoordinates: [],
      secondsRemaining: 15,
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
          decrementSeconds={this.decrementSeconds}
          seconds={this.state.secondsRemaining}
          levelComplete={this.state.levelComplete}
          fail={this.state.levelFailure}
        />
        <Sidebar
          ammo={this.state.ammunition}
          numShots={this.state.numShots}
          points={this.state.points}
          resetGame={this.handleClickResetGame}
        />
      </div>
    );
  }
}

export default App;
