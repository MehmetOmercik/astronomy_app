import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { fetchSolarSystemBody } from "../../Features/SolarSystem/SolarSystemAction";

export const useGetSolarSystemBody = (value: string, title: string, description: string) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSolarSystemBody(value, title, description));
  }, [dispatch, value, title, description]);
};
