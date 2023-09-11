import { useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  HomePage,
  SolarSystemPage,
  SolarSystemBodyPage,
  StarChartPage,
  MoonPhasePage,
  SearchPage,
} from "./pages/indexPg";
import { NavBar } from "@components/UI/indexUI";

import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";
import { ISourceOptions } from "tsparticles-engine";

const App = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);
  return (
    <section className="flex min-h-[100vh]">
      <NavBar />
      <Particles options={particlesOptions as ISourceOptions} init={particlesInit} />
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
