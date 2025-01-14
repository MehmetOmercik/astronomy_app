// Function to load Local storage, may need to consider redux-persist if this file gets too big

import { SolarSystemStatus } from "@/features/SolarSystem/SolarSystemSlice";

type LoadLocalStorageStateResult = {
    tableLocalStorage: {
        header: string[]
        rows: Array<{
            entry: {
                id: string;
                name: string;
            }
            cells: Record<string, any>[]
        }>
    };
    titleLocalStorage: string;
    statusLocalStorage: SolarSystemStatus
}

export const loadLocalStorageState = (): LoadLocalStorageStateResult | undefined => {
    try {
        const tableSerialized = localStorage.getItem("solarSystemTable");      
        const titleSerialized = localStorage.getItem("solarSystemTitle")      
        // const descriptionSerialized = localStorage.getItem("solarSystemDescription");
        const statusSerialized = localStorage.getItem("solarSystemStatus");    

        if (tableSerialized === null || 
            titleSerialized === null || 
            // descriptionSerialized === null || 
            statusSerialized === null
        ) return undefined;

        return {
          tableLocalStorage: JSON.parse(tableSerialized),
          titleLocalStorage: JSON.parse(titleSerialized),
        //   descriptionLocalStorage: JSON.parse(descriptionSerialized),
          statusLocalStorage: JSON.parse(statusSerialized),
        }
      } catch (err) {
        console.error('Error loading state:', err);
        return undefined;
      }
  };