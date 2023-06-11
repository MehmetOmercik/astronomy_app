import { FC } from "react";
import { LinkSimple } from "../../Components/UI/Buttons/Link/Link";
import { useAppDispatch } from "../../App/hooks";
import {
  updateTitle,
  updateDescription,
  updateData,
} from "../../Features/SolarSystem/SolarSystemSlice";
import SolarSystemInfo from "./SolarSystemInfo.json";
import { getBodyDetails } from "../../utils/http/http";
// import { useGetBodyDetails } from "../../hooks/hooks";

export const SolarSystemPage: FC = () => {
  const dispatch = useAppDispatch();
  const handleClick = async (value: string, title: string, description: string) => {
    try {
      const bodyPosition = await getBodyDetails(
        value,
        51.51,
        0.13,
        11,
        "2017-12-20",
        "2017-12-20",
        "08:00:00"
      );
      console.log(bodyPosition);

      //Dispatches the new title, description and data for the SolarSystemBodyPage
      dispatch(updateData(bodyPosition));
      dispatch(updateTitle(title));
      dispatch(updateDescription(description));
    } catch (error) {
      console.error(
        "SolarSystemPage dispatch of title and description or api call has failed: ",
        error
      );
    }
  };
  const celestialBodies = SolarSystemInfo;

  return (
    <div className="flex">
      {celestialBodies.map((body) => (
        <div key={body.id} className="mx-2 my-4">
          <LinkSimple
            value={body.value}
            to={`./${body.id}`}
            onClick={() => handleClick(body.value, body.title, body.description)}
            className="self-start rounded-xl bg-slate-300 p-2 text-3xl"
          />
        </div>
      ))}
    </div>
  );
};
