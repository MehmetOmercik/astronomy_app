/**
 * returns the settings for fetch argument based on arguments passed
 * @param {string} method - HTTP method used i.e. "POST" or "GET"
 * @param {object} params.data - Optional data that needs to be passed
 * @param {string} params.authString - Authentication String that is generated to access API's
 * @returns {object}
 */

export const options = (method: string, { authString }: object): object => {
  return {
    method: method,
    headers: {
      ...(authString && {
        Authorization: `Basic ${authString}`,
      }),
    },
  };
};

export async function fetchSimple(path: string, options = {}) {
  const response = await fetch(path, { ...options });
  if (response.ok) {
    return response.json();
  } else {
    console.error("Not Working");
  }
}
