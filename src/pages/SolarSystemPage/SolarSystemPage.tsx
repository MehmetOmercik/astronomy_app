import { FC } from "react";
import { useAppDispatch } from "@app/hooks";
import {
  setLoading,
  setLoaded,
  setError,
  updateTitle,
  updateDescription,
  updateTable,
} from "@features/SolarSystem/SolarSystemSlice";
import SolarSystemInfo from "./SolarSystemInfo.json";
import { getBodyDetails } from "../../utils/http/http";

import { fetchSolarSystemBody } from "@features/SolarSystem/SolarSystemAction";
import { useGetSolarSystemBody } from "@hooks/hooks";
import { useNavigate } from "react-router-dom";

export const SolarSystemPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = async (id: number, planet: string, title: string, description: string) => {
    navigate(`./${id}`);
    dispatch(setLoading(true));
    dispatch(setLoaded(false));
    dispatch(setError(false));

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateFormatted = `${year}-${month}-${day}`;

    console.log("🚀 ~ file: SolarSystemPage.tsx:27 ~ handleClick ~ dateNow:", dateFormatted);
    try {
      const bodyPosition = await getBodyDetails(
        planet,
        51.51,
        0.13,
        11,
        dateFormatted,
        dateFormatted,
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
    <div className="flex flex-wrap ">
      {celestialBodies.map((body) => {
        return (
          <img
            key={body.id}
            className="relative z-10 h-64 w-64 cursor-pointer object-contain mix-blend-difference hover:scale-110"
            src={`/src/assets/planetImages/${body.value}.png`}
            onClick={() => handleClick(body.id, body.value, body.title, body.description)}
          />
        );
      })}
    </div>
  );
};
