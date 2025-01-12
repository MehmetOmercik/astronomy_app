import { FC, Fragment, useState } from "react";
import { LinkSimple } from "../indexUI";
export const Sidebar: FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

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
          <LinkSimple value="Home" to="/" className="sidebar-link" />
          <LinkSimple value="Solar System" to="/solarSystem" className="sidebar-link" />
          <LinkSimple value="Star Chart" to="/starChart" className="sidebar-link" />
          <LinkSimple value="Moon Phases" to="/moonPhase" className="sidebar-link" />
        </div>
      </section>
    </Fragment>
  );
};
