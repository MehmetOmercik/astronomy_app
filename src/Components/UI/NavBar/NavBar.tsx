import { FC } from "react";
import { LinkSimple } from "../indexUI";
import { SearchBar } from "../indexUI";
export const NavBar: FC = () => {
  return (
    <nav className="flex flex-col gap-y-2 bg-gray-700 py-4">
      <SearchBar />
      <div className="flex w-full flex-col">
        <LinkSimple value="Home" to="/" className="navbar-button" />
        <LinkSimple value="Solar System" to="/solarSystem" className="navbar-button" />
        <LinkSimple value="Star Chart" to="/starChart" className="navbar-button" />
        <LinkSimple value="Moon Phases" to="/moonPhase" className="navbar-button" />
      </div>
    </nav>
  );
};
