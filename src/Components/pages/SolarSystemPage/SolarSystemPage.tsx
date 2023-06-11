import { FC, useEffect } from "react";
import { LinkSimple } from "../../UI/indexUI";
import { useAppDispatch } from "../../../App/hooks";
import { updateTitle, updateDescription } from "../../../Features/SolarSystem/SolarSystemSlice";
import SolarSystemInfo from "./SolarSystemInfo.json";

export const SolarSystemPage: FC = () => {
  const dispatch = useAppDispatch();
  const handleClick = (title: string, description: string) => {
    try {
      dispatch(updateTitle(title));
      dispatch(updateDescription(description));
    } catch (error) {
      console.error("SolarSystemPage dispatch of title and description has failed: ", error);
    }
  };
  const celestialBodies = SolarSystemInfo;

  // useEffect(() => {
  //   updatePath();
  // });

  return (
    <div className="flex">
      {celestialBodies.map((body) => (
        <div key={body.id} className="mx-2 my-4">
          <LinkSimple
            value={body.value}
            to={`./${body.id}`}
            onClick={() => handleClick(body.title, body.description)}
            className="self-start rounded-xl bg-slate-300 p-2 text-3xl"
          />
        </div>
      ))}
    </div>
  );
};
