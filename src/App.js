import React, { useState, useEffect, useRef } from "react";
import Paintball from "./components/Paintball/Paintball";
import Sidebar from "./components/Sidebar/Sidebar";
import Target from "./components/Target/Target";
import CountdownClock from "./components/CountdownClock/CountdownClock";

function App() {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [ammunition, setAmmo] = useState("O O O O");
  const [shotCount, setCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [shotCoordinates, setShotCoords] = useState([]);
  const [targetCoordinates, setTargetCoords] = useState(["20em", "35em"]);

  useEffect(() =>
    window.addEventListener("click", e => {
      const { clientX, clientY } = e;
      setAmmo(
        ammunition
          .split("")
          .slice(1)
          .join("")
      );
      setCount(shotCount + 1);
      setX(clientX);
      setY(clientY);

      setShotCoords([
        ...shotCoordinates.slice(),
        [clientX, clientY, setPaintColor()]
      ]);
    })
  );

  const setPaintColor = () => {
    const colors = ["blue", "black", "green", "orange", "purple", "red"];
    const min = 0;
    const max = 5;
    let randNum = Math.floor(Math.random() * (max - min));
    return colors[randNum];
  };

  const onTargetHit = () => {
    const { top, right } = getRandomCoordPair();
    setPoints(points + 10);
    setTargetCoords([top, right]);
  };

  const getRandomCoordPair = () => {
    const max = 35;
    const min = 5;
    const randNumTop =
      Math.floor(Math.random() * (max - min)).toString() + "em";
    const randNumRight =
      Math.floor(Math.random() * (max - min)).toString() + "em";
    return { top: randNumTop, right: randNumRight };
  };

  const handleClickResetGame = () => {
    alert("Reset Game!");
  };
  return (
    <div>
      {shotCoordinates.map((shotCoords, index) => (
        <Paintball
          x={shotCoords[0].toString()}
          y={shotCoords[1].toString()}
          color={shotCoords[2]}
          key={index}
        />
      ))}
      <Target
        top={targetCoordinates[0]}
        right={targetCoordinates[1]}
        targetHit={onTargetHit}
      />
      <CountdownClock />
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
