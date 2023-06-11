/**
 * returns the settings for fetch argument based on arguments passed
 * @param {string} method - HTTP method used i.e. "POST" or "GET"
 * @param {object} params.data - Optional data that needs to be passed
 * @param {string} params.authString - Authentication String that is generated to access API's
 * @returns {object}
 */

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
