import React, { useState } from "react";
import {
  getBodies,
  getAllBodyPositions,
  getBodyPosition,
  getStarChart,
  getMoonPhase,
} from "./Components/utils/http/http";
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
    // const bodyPosition = await getBodyPosition(
    //   "earth",
    //   51.51,
    //   0.13,
    //   11,
    //   "2017-12-20",
    //   "2017-12-20",
    //   "08:00:00"
    // );
    // console.log(bodyPosition);

    const starChartObject = {
      style: "default",
      observer: {
        latitude: 51.51,
        longitude: 0.13,
        date: "2023-06-04",
      },
      view: {
        type: "constellation" as const,
        parameters: {
          constellation: "ori",
        },
      },
    };

    // use as const to fix String/Literal type error issue
    const moonPhaseObject = {
      format: "png" as const,
      style: {
        moonStyle: "sketch" as const,
        // "backgroundStyle": "stars",
        // "backgroundColor": "red",
        // "headingColor": "white",
        // "textColor": "red"
      },
      observer: {
        latitude: 6.56774,
        longitude: 79.88956,
        date: "2020-11-01",
      },
      view: {
        type: "portrait-simple" as const,
        orientation: "south-up" as const,
      },
    };

    const starChart = await getStarChart(starChartObject);
    const moonPhase = await getMoonPhase(moonPhaseObject);
    console.log(starChart.data.imageUrl);
    console.log(moonPhase.data.imageUrl);
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
