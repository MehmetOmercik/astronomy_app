import React, { FC, Fragment } from "react";
import { LinkSimple } from "../indexUI";
import { PageRoutes } from "@src/constants";

interface SidebarProps {
  isSidebarVisible: boolean;
  setIsSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: FC<SidebarProps> = ({isSidebarVisible, setIsSidebarVisible}) => {
  return (
    <Fragment>
      {/* Hamburger button */}
      {!isSidebarVisible && 
      <div className="hamburger-container" onClick={() => {setIsSidebarVisible(true)}}>
        <div className={`hamburger-bar`}></div>
        <div className={`hamburger-bar`}></div>
        <div className={`hamburger-bar`}></div>
      </div>
        
      }
      <section className={`sidebar ${isSidebarVisible ? 'open' : 'closed'}`}>
        {/* //TODO Implement debouncing on search bar to prevent spamming requests to backend */}
        <div className="flex w-full flex-col relative pt-9">
          <button className="absolute top-1 right-4 text-2xl" onClick={() => setIsSidebarVisible(false)}>&lt;&lt;</button>
          <LinkSimple value="Home" to={PageRoutes.HOMEPAGE} className="sidebar-link" />
          <LinkSimple value="Solar System" to={PageRoutes.SOLAR_SYSTEM_PAGE} className="sidebar-link" />
          <LinkSimple value="Star Chart" to={PageRoutes.STAR_CHART_PAGE} className="sidebar-link" />
          <LinkSimple value="Moon Phases" to={PageRoutes.MOON_PHASE_PAGE} className="sidebar-link" />
        </div>
      </section>
    </Fragment>
  );
};
