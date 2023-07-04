import { FC } from "react";
import { useAppSelector } from "@/app/hooks";
import { SolarSystemBodyTable } from "@/components/UI/indexUI";
import { useGetSolarSystemBody } from "../../hooks/hooks";

export const SolarSystemBodyPage: FC = () => {
  const {
    title,
    description,
    table,
    loading: solarSystemLoading,
    loaded: solarSystemLoaded,
    error: solarSystemError,
  } = useAppSelector((state) => state.solarSystem);
  const headers = table.header;
  const rows = table.rows[0].cells;
  // console.log(rows);

  // useGetSolarSystemBody();

  return (
    <div>
      {solarSystemLoading && <h1>Loading, please wait...</h1>}
      {solarSystemLoaded && (
        <div>
          <h1 className="text-center">{title}</h1>
          <p className="container mx-4 my-2">{description}</p>
          <SolarSystemBodyTable headers={headers} rows={rows} />
        </div>
      )}
      {solarSystemError && <p>ERROR: NOT LOADING</p>}
    </div>
  );
};
