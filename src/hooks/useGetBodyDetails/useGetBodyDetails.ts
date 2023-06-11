import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
  updateTitle,
  updateDescription,
  updateData,
} from "../../Features/SolarSystem/SolarSystemSlice";
import { getBodyDetails } from "../../utils/http/http";

export const useGetBodyDetails = (value: string, title: string, description: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCelestialBodyDetails = async () => {
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
    getCelestialBodyDetails();
  }, [dispatch, value, title, description]);
};
