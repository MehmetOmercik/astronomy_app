import { useCallback, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  HomePage,
  SolarSystemPage,
  SolarSystemBodyPage,
  StarChartPage,
  MoonPhasePage,
  SearchPage,
} from "./pages/indexPg";
import { Sidebar } from "@components/UI/indexUI";

import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";
import { ISourceOptions } from "tsparticles-engine";

const App = () => {
  // State to set sidebar to visible, if the screen size is lower than the tablet breakpoint (768) then set to false
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); 

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <section className="flex min-h-[100vh]">
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        setIsSidebarVisible={setIsSidebarVisible}
      />
      {isSidebarVisible && <div id='overlay' className="overlay" onClick={() => setIsSidebarVisible(false)}></div>}
      <Particles
        id="tsparticles"
        options={particlesOptions as ISourceOptions}
        init={particlesInit}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/solarSystem" element={<SolarSystemPage />} />
        <Route path={`/solarSystem/:id`} element={<SolarSystemBodyPage />} />
        <Route path="/starChart" element={<StarChartPage />} />
        <Route path="/moonPhase" element={<MoonPhasePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </section>
  );
};

export default App;
