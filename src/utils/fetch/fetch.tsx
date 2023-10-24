/**
 * returns the settings for fetch argument based on arguments passed
 * @param {string} method - HTTP method used i.e. "POST" or "GET"
 * @param {object} params.data - Optional data that needs to be passed
 * @param {string} params.authString - Authentication String that is generated to access API's
 * @returns {object}
 */

import axios from "axios";
import { authString } from "../api/api";

export const options = (
  method: string,
  { payload, authString }: { payload?: object; authString: string }
): object => {
  return {
    method: method,
    headers: {
      ...(authString && {
        Authorization: `Basic ${authString}`,
      }),
    },
    ...(payload && {
      body: JSON.stringify(payload),
    }),
  };
};

export async function fetchSimple(path: string, options = {}) {
  try {
    const response = await fetch(path, { ...options });
    if (!response.ok) {
      console.log("path debuging: ", path);
      console.log("options debuging: ", options);
      throw new Error("Failed to fetch data");
    }
    return response.json();
  } catch (error) {
    console.error("Error: ", (error as Error).message);
  }
}

export async function axiosSimple(
  url: string, //Can use url as full path or url to add onto the baseURL
  method: string,
  payload?: object,
  params?: object | null,
  baseURL?: string, //
  customAuthString?: string | null //Optional parameter to specifically define authString
  // options = {}
) {
  try {
    const response = await axios({
      method: method,
      url: url,
      baseURL: baseURL,
      headers: {
        Authorization: `Basic ${customAuthString || authString}`,
      },
      params: { ...params },
      data: { ...payload },
    });
    if (response.status !== (200 || 201)) {
      throw new Error(
        `Invalid response:  ${response?.status ?? "Unknown Status"} ${
          response?.statusText ?? "Unknown Status text"
        } `
      );
    }
    return response.data;
  } catch (error) {
    console.error("Error: ", (error as Error).message);
  }
}
