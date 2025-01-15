import { Fragment } from "react";
import { IoArrowBackCircle } from "react-icons/io5";

import { SolarSystemStatus } from "@src/constants";
import { useAppSelector } from "@app/hooks";
import { SolarSystemBodyTable } from "@components/UI/indexUI";
import { useNavigate } from "react-router-dom";
import { loadLocalStorageState } from "@utils/localStorage/localStorage";
import { PageRoutes } from "@src/constants";

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

  const preloadLocalStorage = loadLocalStorageState()
  // TODO get solarSystemState working for below
  const {
    title,
    // description,
    table,
    status: solarSystemStatus,
  } = useAppSelector((state: any) => state.solarSystem);
  let solarSystemBodyTitle = title
  // let solarSystemBodyDescription = description
  let headers = table.header;
  let rows = table.rows[0].cells;
  const navigate = useNavigate();

  const loadingStatus = solarSystemStatus === SolarSystemStatus.PENDING
  const rejectedStatus = solarSystemStatus === SolarSystemStatus.REJECTED
  // Fulfilled status is either the normal status is fulfilled OR local storage status is fulfilled AND normal status is NOT rejected
  const fulfilledStatus = solarSystemStatus === SolarSystemStatus.FULFILLED || 
    (
      preloadLocalStorage?.statusLocalStorage === SolarSystemStatus.FULFILLED && 
      !rejectedStatus
    )


  // ? Check if table is already stored in localStorage AND there isn't a fetch currently happening / fetch fail...
  if (preloadLocalStorage && (!loadingStatus || !rejectedStatus)) {
    headers = preloadLocalStorage.tableLocalStorage.header
    rows = preloadLocalStorage.tableLocalStorage.rows[0].cells;
    solarSystemBodyTitle = preloadLocalStorage.titleLocalStorage
    // solarSystemBodyDescription = preloadLocalStorage.descriptionLocalStorage
  }

  return (
    <Fragment>
      <button 
        className="absolute top-12 left-1 text-5xl min-[345px]:top-3 min-[345px]:left-12 sm:top-2 sm:left-32 sm:text-7xl"
        onClick={() => navigate(PageRoutes.SOLAR_SYSTEM_PAGE)}
      >
        <IoArrowBackCircle />
      </button>
      <section className="my-8 flex flex-grow justify-center">
        {loadingStatus && <h1>Loading, please wait...</h1>}
        {fulfilledStatus && (
          <div>
            <h1 className="mb-4 text-3xl text-center font-medium">{solarSystemBodyTitle}</h1>
            {/* <p className="">{description}</p> */}
            <SolarSystemBodyTable headers={headers} rows={rows} />
          </div>
        )}
        {rejectedStatus && <p>ERROR: NOT LOADING</p>}
      </section>
    </Fragment>
  );
};
