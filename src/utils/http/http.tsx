import { BODIES, MOON_PHASE, POSITIONS, SEARCH, STAR_CHART, authString } from "../api/api";
import { options, fetchSimple } from "../fetch/fetch";

/**
 * Fetches an array of celestial bodies in the solar system
 * @returns {Promise}
 */
export const getBodies = async (): Promise<any> => {
  return await fetchSimple(BODIES, options("GET", { authString }));
};

/**
 * Fetches the positions of all celestial bodies in the solar system given the observer location and time
 * @param latitude
 * @param longitude
 * @param elevation
 * @param fromDate
 * @param toDate
 * @param time
 * @returns {Promise}
 */
export const getAllBodyDetails = async (
  latitude: number,
  longitude: number,
  elevation: number,
  fromDate: string,
  toDate: string,
  time: string
): Promise<any> => {
  return await fetchSimple(
    `${POSITIONS}/?latitude=${latitude}&longitude=${longitude}&elevation=${elevation}&from_date=${fromDate}&to_date=${toDate}&time=${time}`,
    options("GET", { authString })
  );
};

/**
 * Fetches the position of a specific celestial body given the observer location and time
 * @param body
 * @param latitude
 * @param longitude
 * @param elevation
 * @param fromDate
 * @param toDate
 * @param time
 * @returns {Promise}
 */
export const getBodyDetails = async (
  body: string,
  latitude: number,
  longitude: number,
  elevation: number,
  fromDate: string,
  toDate: string,
  time: string
): Promise<any> => {
  return await fetchSimple(
    `${POSITIONS}/${body}?latitude=${latitude}&longitude=${longitude}&elevation=${elevation}&from_date=${fromDate}&to_date=${toDate}&time=${time}`,
    options("GET", { authString })
  );
};

type viewOption = "constellation" | "area";
type starChartObject = {
  style?: string;
  observer: {
    latitude: number;
    longitude: number;
    date: string;
  };
  view: {
    type: viewOption;
    parameters: {
      // TODO Get this parameter working so that TS enforces the fact that atleast one option in the parameters is required!
      [key in viewOption]?: string;
    };
  };
};

/**
 * Fetches a star chart of a certain kind depending on what has been posted through the body
 * @param payload
 * @returns {Promise}
 */
export const getStarChart = async (payload: starChartObject): Promise<any> => {
  return await fetchSimple(STAR_CHART, options("POST", { authString, payload }));
};

interface MoonPhaseObject {
  format?: "png" | "svg";
  style: {
    moonStyle: "default" | "sketch" | "shaded";
    backgroundStyle?: "stars" | "solid";
    backgroundColor?: string;
    headingColor?: string;
    textColor?: string;
  };
  observer: {
    latitude: number;
    longitude: number;
    date: string;
  };
  view: {
    type: "portrait-simple" | "landscape-simple";
    orientation: "north-up" | "south-up";
  };
}
/**
 * Fetches a moon phase image of a certain kind depending on what has been posted through the body
 * @param payload
 * @returns {Promise}
 */
export const getMoonPhase = async (payload: MoonPhaseObject): Promise<any> => {
  return await fetchSimple(MOON_PHASE, options("POST", { authString, payload }));
};

/**
 * Allows you to search the API's catalogue for objects
 * @param term
 * @returns {Promise<any>}
 */
export const getSearch = async (
  term: string
  // match_type?: "fuzzy" | "exact",
  // ra?: number,
  // dec?: number,
  // limit: number,
  // offset: number,
  // order_by: "name"
): Promise<any> => {
  return await fetchSimple(
    `${SEARCH}/?term=${term}&limit=5&order_by=name`,
    options("GET", { authString })
  );
};
