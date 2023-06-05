import { BODIES, POSITIONS, authString } from "../api/api";
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
export const getAllBodyPositions = async (
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
export const getBodyPosition = async (
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
