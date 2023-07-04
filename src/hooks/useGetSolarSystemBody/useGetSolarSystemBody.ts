import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { fetchSolarSystemBody } from "@features/SolarSystem/SolarSystemAction";

export const useGetSolarSystemBody = (value: string, title: string, description: string) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSolarSystemBody(value, title, description));
  }, [dispatch, value, title, description]);
};
