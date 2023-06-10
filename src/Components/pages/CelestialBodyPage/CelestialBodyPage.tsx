import { FC } from "react";
import { getBodyPosition } from "../../utils/http/http";

export const CelestialBodyPage: FC = () => {
  async () => {
    const bodyPosition = await getBodyPosition(
      "earth",
      51.51,
      0.13,
      11,
      "2017-12-20",
      "2017-12-20",
      "08:00:00"
    );
    console.log(bodyPosition);
  };
  return <div>Celestial bodies will render here!</div>;
};
