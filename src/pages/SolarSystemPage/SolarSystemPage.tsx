import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@app/hooks";
import {
  setStatus,
  updateTitle,
  updateDescription,
  updateTable,
} from "@features/SolarSystem/SolarSystemSlice";
import { SolarSystemStatus } from "@src/constants";
import SolarSystemInfo from "./SolarSystemInfo.json";
import { getBodyDetails } from "../../utils/http/http";

export const SolarSystemPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = async (
    id: number,
    planet: string,
    title: string,
    description: string
  ) => {
    try {
      // Clear local storage first to remove any existing information
      localStorage.clear();

      // Navigate to page and dispatch PENDING status
      navigate(`./${id}`);
      dispatch(setStatus(SolarSystemStatus.PENDING));

      // Format date to correct value for POST request
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateFormatted = `${year}-${month}-${day}`;

      // Make POST request to astronomy API body details
      const bodyPosition = await getBodyDetails(
        planet,
        51.51,
        0.13,
        11,
        dateFormatted,
        dateFormatted,
        "08:00:00"
      );
      // console.log("bodyposition: ", bodyPosition);

      //Dispatches the new title, description, data and status for the SolarSystemBodyPage
      dispatch(updateTable(bodyPosition.data.table));
      dispatch(updateTitle(title));
      dispatch(updateDescription(description));
      dispatch(setStatus(SolarSystemStatus.FULFILLED));

      // Saves information to local storage. This is used to cache results for page reloading
      localStorage.setItem("solarSystemTable", JSON.stringify(bodyPosition.data.table));      
      localStorage.setItem("solarSystemTitle", JSON.stringify(title));      
      // localStorage.setItem("solarSystemDescription", JSON.stringify(description));      
      localStorage.setItem("solarSystemStatus", JSON.stringify(SolarSystemStatus.FULFILLED));
    } catch (error) {
      dispatch(setStatus(SolarSystemStatus.REJECTED));
      console.error(
        "SolarSystemPage dispatch of title and description or api call has failed: ",
        error
      );
    }
  };

  const celestialBodies = SolarSystemInfo;

  return (
    <div className="flex justify-center flex-wrap sm:ml-20 sm:justify-normal">
      {celestialBodies.map((body) => {
        return (
          <div className="flex flex-col text-center" key={`solar-system-body-${body.id}`}>
              <img
                key={body.id}
                className={`relative z-10 h-64 w-64 cursor-pointer object-contain mix-blend-difference hover:scale-110`}
                src={`/planetImages/${body.value}.png`}
                onClick={() =>
                  handleClick(body.id, body.value, body.title, body.description)
                }
            />
            <p className="text-2xl font-medium">{body.title}</p>
          </div>
          
        );
      })}
    </div>
  );
};
