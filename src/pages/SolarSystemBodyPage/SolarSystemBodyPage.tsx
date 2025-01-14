import { Fragment } from "react";
import { IoArrowBackCircle } from "react-icons/io5";

import { SolarSystemStatus } from "@features/SolarSystem/SolarSystemSlice";
import { useAppSelector } from "@app/hooks";
import { SolarSystemBodyTable } from "@components/UI/indexUI";
import { useNavigate } from "react-router-dom";

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

  // TODO get solarSystemState working for below
  const {
    title,
    // description,
    table,
    status: solarSystemStatus,
  } = useAppSelector((state: any) => state.solarSystem);
  const headers = table.header;
  const rows = table.rows[0].cells;
  const navigate = useNavigate();

  return (
    <Fragment>
      <button 
        className="absolute top-12 left-1 text-5xl min-[345px]:top-3 min-[345px]:left-12 sm:top-2 sm:left-32 sm:text-7xl"
        onClick={() => navigate('/solarSystem')}
      >
        <IoArrowBackCircle />
      </button>
      <section className="my-8 flex flex-grow justify-center">
        {solarSystemStatus === SolarSystemStatus.PENDING && <h1>Loading, please wait...</h1>}
        {solarSystemStatus === SolarSystemStatus.FULFILLED && (
          <div>
            <h1 className="mb-4 text-3xl text-center font-medium">{title}</h1>
            {/* <p className="">{description}</p> */}
            <SolarSystemBodyTable className="" headers={headers} rows={rows} />
          </div>
        )}
        {solarSystemStatus === SolarSystemStatus.REJECTED && <p>ERROR: NOT LOADING</p>}
      </section>
    </Fragment>
  );
};
