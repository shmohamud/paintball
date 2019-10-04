import React from "react";
import "./styles.css";
import Paintball from "./Paintball";
import Scoreboard from './Scoreboard'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      numShots: 0,
      shotCoordinates: []
    };
  }

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
        ...state.shotCoordinates,
        [clientX, clientY, this.randomColor()]
      ]
    });
    this.destroyPaintball();
  };

  destroyPaintball = () => {
    setTimeout(() => {
      let state = { ...this.state };
      let shotCoordinates = state.shotCoordinates.slice(1);
      this.setState({
        ...state,
        shotCoordinates: shotCoordinates
      })
    }, 5000)
  };

  randomColor = () => {
    let colors = ["blue", "black", "green", "orange", "purple", "red"];
    let min = 0;
    let max = 5;
    let randNum = Math.floor(Math.random() * (max - min));
    return colors[randNum];
  };

  handleClickResetGame = () => {
    let state = { ...this.state }
    let shotCoordinates = []
    this.setState({
      ...state, numShots:-1,
      shotCoordinates: shotCoordinates
    })
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
        <Scoreboard numShots={this.state.numShots} resetGame={this.handleClickResetGame}/>
      </div>
    )
  }
}

export default App;
