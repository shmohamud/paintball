import React from "react";
import "./styles.css";
import Paintball from "./Paintball";
import Sidebar from "./Sidebar";
import Target from "./Target";
import Timer from "./Timer";

class App extends React.Component {
  state = {
    ammunition: "O O O 0",
    secondsRemaining: 15,
    x: 0,
    y: 0,
    shotCoordinates: [],
    targetCoordinates: ["20em", "35em"],
    numShots: 0,
    points: 0,
    levelSuccess: false,
    levelFail:false
  };

  componentDidMount() {
    window.addEventListener("click", e => this.onShootPaintball(e));
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.points>=30 && prevState.levelSuccess===false){
       alert("Level One Completed. Level two in 5....4....3......2......1...")
       this.setState({levelSuccess:true, shots: this.state.shots + 1})
       this.handleClickResetGame()
      }
    
    if(prevState.ammunition.length === 0 && prevState.levelFail === false){
        alert("Better luck next time!")
        this.setState({levelFail:true})
        this.handleClickResetGame()

}
  }
  onShootPaintball = e => {
    let { clientX, clientY } = e;
    let state = { ...this.state };
    this.setState({
      ...state,
      ammunition: state.ammunition.split(" ").slice(1).join(" "),
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
    const state = { ...this.state };
    const points = state.points + 10;
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
    const state = { ...this.state };
    this.setState({
      ...state,
      numShots: -1,
      points: 0,
      shotCoordinates: [],
      secondsRemaining: 15,
      levelSuccess:false,
      levelFail:false
    });
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
        <Timer
          decrementSeconds={this.decrementSeconds}
          seconds={this.state.secondsRemaining}
          fail = {this.state.levelFailure}/>
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