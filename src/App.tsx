import React, { useState } from "react";
import { getBodies } from "./Components/utils/http/http";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Components/pages/indexPg";

function App() {
  const [planets, setPlanets] = useState(["default"]);

  const handleButton = async () => {
    const bodies = await getBodies();
    console.log("bodies: ", bodies.data);
    setPlanets([...bodies.data.bodies]);
  };
  return (
    <>
      {planets.map((planet, index) => (
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
