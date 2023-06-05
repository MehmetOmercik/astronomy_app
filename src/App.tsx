import React, { useState } from "react";
import { getBodies, getAllBodyPositions, getBodyPosition } from "./Components/utils/http/http";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Components/pages/indexPg";

function App() {
  const celestialBodies = [
    "sun",
    "moon",
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
    "pluto",
  ];

  const handleButton = async () => {
    const bodyPosition = await getBodyPosition(
      "earth",
      51.51,
      0.13,
      11,
      "2017-12-20",
      "2017-12-20",
      "08:00:00"
    );
    console.log(bodyPosition);
  };
  return (
    <>
      {celestialBodies.map((planet, index) => (
        <li key={index}>{planet}</li>
      ))}
      <button onClick={handleButton}>Click Here to activate API</button>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
