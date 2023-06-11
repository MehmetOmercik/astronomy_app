import { FC } from "react";
import { getBodyPosition } from "../../utils/http/http";
import { useParams } from "react-router-dom";

interface SolarSystemBodyPageProps {
  title: string;
  description: string;
}
export const SolarSystemBodyPage: FC<SolarSystemBodyPageProps> = ({ title, description }) => {
  const { id } = useParams();
  // async () => {
  //   const bodyPosition = await getBodyPosition(
  //     "earth",
  //     51.51,
  //     0.13,
  //     11,
  //     "2017-12-20",
  //     "2017-12-20",
  //     "08:00:00"
  //   );
  //   console.log(bodyPosition);
  // };
  return (
    <div>
      <p>Celestial bodies will render here!</p>
      <p>{title}</p>
      <p>{description}</p>
      <p>ID: {id}</p>
    </div>
  );
};
