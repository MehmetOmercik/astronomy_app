import { FC } from "react";
import { LinkSimple } from "../indexUI";

export const NavBar: FC = () => {
  return (
    <nav className="flex gap-2">
      <LinkSimple value="Home" to="/" className="bg-red-500" />
      <LinkSimple value="Solar System" to="/solarSystem" className="bg-red-500" />
      <LinkSimple value="Star Chart" to="/starChart" className="bg-red-500" />
    </nav>
  );
};
