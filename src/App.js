import React, { useState, useEffect } from "react";
import Paintball from "./components/Paintball/Paintball";
import Sidebar from "./components/Sidebar/Sidebar";
import Target from "./components/Target/Target";
import Timer from "./components/Timer /Timer";

function App() {
  const [ammunition, setAmmo] = useState("OOOO");
  const [x, setShotX] = useState(0);
  const [y, setShotY] = useState(0);
  let [shotCount, setCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [secondsRemaining, setSeconds] = useState(15);
  let [shotCoordinates, setShotCoords] = useState([]);
  const [targetCoordinates, setTargetCoords] = useState(["20em", "35em"]);

  useEffect(() =>
    window.addEventListener(
      "click",
      e => onShootPaintball(e))
      ,
      []
    )

  const onShootPaintball = e => {
    console.log("IN ON SHOOT PAINTBALL");
    debugger;
    const { clientX, clientY } = e;
    console.log("AMMUNITION IN STATE BEFORE SPENDING ONE ROUND: ", ammunition);
    setAmmo(
      ammunition
        .split("")
        .slice(1)
        .join("")
    );
    setCount(shotCount + 1);

    console.log("AMMUNITION IN STATE AFTER SPENDING ROUND :", ammunition)
    setShotX(clientX);
    setShotY(clientY);
    const newCoordsAndColor = [clientX, clientY, setPaintColor()];
    const newShotCoords = [...shotCoordinates.slice(), ...newCoordsAndColor];
    setShotCoords(newShotCoords);
  };

  const setPaintColor = () => {
    const colors = ["blue", "black", "green", "orange", "purple", "red"];
    const min = 0;
    const max = 5;
    let randNum = Math.floor(Math.random() * (max - min));
    return colors[randNum];
  };

  const onTargetHit = () => {
    console.log("IN ON TARGET HIT");
    const { top, right } = getRandomCoordPair();
    setPoints(points + 10);
    setTargetCoords([top, right]);
  };

  const getRandomCoordPair = () => {
    console.log("IN GET RANDOM COORD PAIR");
    debugger;
    const max = 35;
    const min = 5;
    const randNumTop =
      Math.floor(Math.random() * (max - min)).toString() + "em";
    const randNumRight =
      Math.floor(Math.random() * (max - min)).toString() + "em";
    return { top: randNumTop, right: randNumRight };
  };

  const decrementSeconds = () => {
    if (secondsRemaining) {
      setTimeout(() => {
        setSeconds(() => secondsRemaining - 1);
      }, 1000);
    }
  };

  const handleClickResetGame = () => {
    alert("Reset Game!");
  };
  return (
    <div>
      {
        shotCoordinates.map(shotCoords => 
        <Paintball
          x={shotCoordinates[0].toString()}
          y={shotCoordinates[1].toString()}
          color={shotCoordinates[2]}
        />
        )
      }
      <Target
        top={targetCoordinates[0]}
        right={targetCoordinates[1]}
        targetHit={onTargetHit}
      />
      <Timer decrementSeconds={decrementSeconds} seconds={secondsRemaining} />
      <Sidebar
        ammo={ammunition}
        shotCount={shotCount}
        points={points}
        resetGame={handleClickResetGame}
      />
    </div>
  );
}

export default App;
