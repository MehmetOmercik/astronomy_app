import { FC } from "react";
import { LinkSimple } from "../indexUI";
import { SearchBar } from "../indexUI";
export const NavBar: FC = () => {
  return (
    <nav className="flex items-start justify-between bg-gray-700 p-4">
      <div className="flex gap-5">
        <LinkSimple value="Home" to="/" className="navbar-button" />
        <LinkSimple value="Solar System" to="/solarSystem" className="navbar-button" />
        <LinkSimple value="Star Chart" to="/starChart" className="navbar-button" />
        <LinkSimple value="Moon Phases" to="/moonPhase" className="navbar-button" />
      </div>

      <SearchBar />
    </nav>
  );
};
