import { FC } from "react";
import { useAppSelector } from "@app/hooks";
import { SolarSystemBodyTable } from "@components/UI/indexUI";

export const SolarSystemBodyPage: FC = () => {
  // interface SolarSystemState {
  //   title: string;
  //   table: {
  //     header: string[];
  //     rows: {
  //       cells: string[]; // Replace with the actual type of cells
  //     }[];
  //   };
  // }

  //TODO get solarSystemState working for below
  const {
    title,
    // description,
    table,
    loading: solarSystemLoading,
    loaded: solarSystemLoaded,
    error: solarSystemError,
  } = useAppSelector((state: any) => state.solarSystem);
  const headers = table.header;
  const rows = table.rows[0].cells;

  return (
    <div className="container my-8 flex justify-center">
      {solarSystemLoading && <h1>Loading, please wait...</h1>}
      {solarSystemLoaded && (
        <div>
          <h1 className="mb-4 text-center">{title}</h1>
          {/* <p className="">{description}</p> */}
          <SolarSystemBodyTable className="" headers={headers} rows={rows} />
        </div>
      )}
      {solarSystemError && <p>ERROR: NOT LOADING</p>}
    </div>
  );
};
