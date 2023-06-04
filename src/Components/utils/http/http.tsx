import { BODIES, authString } from "../api/api";
import { options, fetchSimple } from "../fetch/fetch";

export const getBodies = async () => {
  return await fetchSimple(BODIES, options("GET", { authString }));
};
