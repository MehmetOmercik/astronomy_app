import { useCallback, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";
import { ISourceOptions } from "tsparticles-engine";

import {
  HomePage,
  SolarSystemPage,
  SolarSystemBodyPage,
  StarChartPage,
  MoonPhasePage,
  // SearchPage,
} from "./pages/indexPg";
import { Sidebar } from "@components/UI/indexUI";
import { PageRoutes } from "./constants";



const App = () => {
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
        <Route path={PageRoutes.HOMEPAGE} element={<HomePage />} />
        <Route path={PageRoutes.SOLAR_SYSTEM_PAGE} element={<SolarSystemPage />} />
        <Route path={PageRoutes.SOLAR_SYSTEM_BODY_PAGE} element={<SolarSystemBodyPage />} />
        <Route path={PageRoutes.STAR_CHART_PAGE} element={<StarChartPage />} />
        <Route path={PageRoutes.MOON_PHASE_PAGE} element={<MoonPhasePage />} />
        {/* <Route path={PageRoutes.SEARCH_RESULTS_PAGE} element={<SearchPage />} /> */}
        <Route path="*" element={<Navigate to={PageRoutes.HOMEPAGE} />} />
      </Routes>
    </section>
  );
};

export default App;
