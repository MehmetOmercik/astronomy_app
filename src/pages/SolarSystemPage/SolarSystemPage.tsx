import { FC } from "react";
import { LinkSimple } from "../../Components/UI/Buttons/Link/Link";
import { useAppDispatch } from "../../App/hooks";
import {
  setLoading,
  setLoaded,
  setError,
  updateTitle,
  updateDescription,
  updateTable,
} from "../../Features/SolarSystem/SolarSystemSlice";
import SolarSystemInfo from "./SolarSystemInfo.json";
import { getBodyDetails } from "../../utils/http/http";

import { fetchSolarSystemBody } from "../../Features/SolarSystem/SolarSystemAction";
import { useGetSolarSystemBody } from "../../hooks/hooks";

export const SolarSystemPage: FC = () => {
  const dispatch = useAppDispatch();
  const handleClick = async (planet: string, title: string, description: string) => {
    dispatch(setLoading(true));
    dispatch(setLoaded(false));
    dispatch(setError(false));
    try {
      const bodyPosition = await getBodyDetails(
        planet,
        51.51,
        0.13,
        11,
        "2017-12-20",
        "2017-12-21",
        "08:00:00"
      );
      //Dispatches the new title, description and data for the SolarSystemBodyPage
      dispatch(updateTable(bodyPosition.data.table));
      dispatch(updateTitle(title));
      dispatch(updateDescription(description));
      dispatch(setLoaded(true));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(true));
      dispatch(setLoading(false));
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
