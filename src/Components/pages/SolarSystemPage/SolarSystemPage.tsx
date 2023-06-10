import { FC } from "react";
import { LinkSimple } from "../../UI/indexUI";

export const SolarSystemPage: FC = () => {
  const celestialBodies = [
    "sun",
    "moon",
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
    "pluto",
  ];

  return (
    <div className="flex">
      {celestialBodies.map((body, index) => (
        <div key={index} className="mx-2 my-4">
          <LinkSimple
            value={body}
            to={`/${body}`}
            className="self-start rounded-xl bg-slate-300 p-2 text-3xl"
          />
        </div>
      ))}
    </div>
  );
};
