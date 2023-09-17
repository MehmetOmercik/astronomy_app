// import {
//   setLoading,
//   setLoaded,
//   setError,
//   updateTable,
//   updateTitle,
//   updateDescription,
// } from "./SolarSystemSlice";
// import { getBodyDetails } from "../../utils/http/http";

// export const fetchSolarSystemBody = (planet, title, description) => {
//   return async (dispatch) => {
//     dispatch(setLoading(true));
//     dispatch(setLoaded(false));
//     dispatch(setError(false));
//     const loadSolarSystemBody = async () => {
//       try {
//         const bodyPosition = await getBodyDetails(
//           planet,
//           51.51,
//           0.13,
//           11,
//           "2017-12-20",
//           "2017-12-21",
//           "08:00:00"
//         );
//         //Dispatches the new title, description and data for the SolarSystemBodyPage
//         dispatch(updateTable(bodyPosition.data.table));
//         dispatch(updateTitle(title));
//         dispatch(updateDescription(description));
//         dispatch(setLoaded(true));
//         dispatch(setLoading(false));
//       } catch (error) {
//         dispatch(setError(true));
//         dispatch(setLoading(false));
//         console.error(
//           "SolarSystemPage dispatch of title and description or api call has failed: ",
//           error
//         );
//       }
//     };
//     loadSolarSystemBody();
//   };
// };
