const ASTRONOMY_APPLICATION_ID = import.meta.env.VITE_ASTRONOMY_APPLICATION_ID;
const ASTRONOMY_APPLICATION_SECRET = import.meta.env.VITE_ASTRONOMY_APPLICATION_SECRET;
const ASTRONOMY_ENDPOINT = import.meta.env.VITE_ASTRONOMY_ENDPOINT;

export const authString = btoa(`${ASTRONOMY_APPLICATION_ID}:${ASTRONOMY_APPLICATION_SECRET}`);

export const BODIES = `${ASTRONOMY_ENDPOINT}/bodies`;
export const POSITIONS = `${BODIES}/positions`;
export const STUDIO = `${ASTRONOMY_ENDPOINT}/studio`;
export const STAR_CHART = `${STUDIO}/star-chart/`;
export const MOON_PHASE = `${STUDIO}/moon-phase/`;
export const SEARCH = `${ASTRONOMY_ENDPOINT}/search`;
