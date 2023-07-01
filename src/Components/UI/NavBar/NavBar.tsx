import { FC } from "react";
import { LinkSimple } from "../indexUI";
import { SearchBar } from "../indexUI";
export const NavBar: FC = () => {
  return (
    <nav className="flex justify-between">
      <div className="flex gap-2">
        <LinkSimple value="Home" to="/" className="bg-red-500" />
        <LinkSimple value="Solar System" to="/solarSystem" className="bg-red-500" />
        <LinkSimple value="Star Chart" to="/starChart" className="bg-red-500" />
        <LinkSimple value="Moon Phases" to="/moonPhase" className="bg-red-500" />
      </div>

      <SearchBar />
    </nav>
  );
};
