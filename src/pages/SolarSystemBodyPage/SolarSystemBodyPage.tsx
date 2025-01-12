import { SolarSystemState } from "@features/SolarSystem/SolarSystemSlice";
import { useAppSelector } from "@app/hooks";
import { SolarSystemBodyTable } from "@components/UI/indexUI";

// TODO Add EVENTS API to page!
export const SolarSystemBodyPage: React.FC = () => {
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
    state: solarSystemState,
  } = useAppSelector((state: any) => state.solarSystem);
  const headers = table.header;
  const rows = table.rows[0].cells;

  return (
    <div className="container my-8 flex min-w-[calc(100%-150px)] justify-center">
      {solarSystemState === SolarSystemState.PENDING && <h1>Loading, please wait...</h1>}
      {solarSystemState === SolarSystemState.FULFILLED && (
        <div>
          <h1 className="mb-4 text-2xl text-center font-medium">{title}</h1>
          {/* <p className="">{description}</p> */}
          <SolarSystemBodyTable className="" headers={headers} rows={rows} />
        </div>
      )}
      {solarSystemState === SolarSystemState.REJECTED && <p>ERROR: NOT LOADING</p>}
    </div>
  );
};
