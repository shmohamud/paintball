import React from "react";
import "./styles.css";
import Paintball from "./Paintball";

var classNames = require("classnames");

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
    console.log("STATE IN component did mount", this.state)
  }

  onShootPaintball = e => {
    let { clientX, clientY } = e;
    let state = { ...this.state };
    this.setState({
      ...state,
      x: clientX,
      y: clientY,
      numShots: (state.numShots += 1),
      shotCoordinates: [...state.shotCoordinates, [clientX, clientY]]
    });
    console.log("STATE IN ON SHOOT PAINTBALL", this.state)
  };

  render() {
    return (
      <div>
        {this.state.shotCoordinates.map(shotCoords => (
          <Paintball x={shotCoords[0]} y={shotCoords[1]} />
        ))}
      </div>
    );
  }
}

export default App;
