import React, { useState, useEffect } from "react";
import Paintball from "./components/Paintball/Paintball";
import Sidebar from "./components/Sidebar/Sidebar";
import Target from "./components/Target/Target";
import Timer from "./components/Timer /Timer";

function App() {
  const [ammunition, setAmmo] = useState("O O O O");
  const [secondsRemaining, setSeconds] = useState(15);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  let [shotCount, setCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [shotCoordinates, setShotCoords] = useState([]);
  const [targetCoordinates, setTargetCoords] = useState(["20em", "35em"]);

  useEffect(() => {
    window.addEventListener("click", e => onShootPaintball(e));
  });

  const onShootPaintball = e => {
    let { clientX, clientY } = e;

    setAmmo(
      ammunition
        .split(" ")
        .slice(1)
        .join(" ")
    );

    setX(clientX);
    setY(clientY);
    const newCoordsAndColor = [clientX, clientY, setPaintColor()];
    setCount((shotCount += 1));
    const newShotCoords = [...shotCoordinates.slice(), ...newCoordsAndColor];
    setShotCoords(newShotCoords);
    destroyPaintball();
  };

  const destroyPaintball = () => {
    setTimeout(() => {
      setShotCoords(shotCoordinates.slice(1));
    }, 5000);
  };

  const onTargetHit = () => {
    const { top, right } = getRandomCoordinates();
    setPoints(points + 10);
    setTargetCoords([top, right]);
  };

  const getRandomCoordinates = () => {
    const max = 35;
    const min = 5;
    const randNumTop =
      Math.floor(Math.random() * (max - min)).toString() + "em";
    const randNumRight =
      Math.floor(Math.random() * (max - min)).toString() + "em";
    return { top: randNumTop, right: randNumRight };
  };

  const setPaintColor = () => {
    const colors = ["blue", "black", "green", "orange", "purple", "red"];
    const min = 0;
    const max = 5;
    const randNum = Math.floor(Math.random() * (max - min));
    return colors[randNum];
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
      {shotCoordinates.map(shotCoords => (
        <Paintball x={shotCoords[0]} y={shotCoords[1]} color={shotCoords[2]} />
      ))}
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
