import React, { useState } from "react";
import { getBodies } from "./Components/utils/http/http";

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
      <h1>hello</h1>
    </>
  );
}

export default App;
