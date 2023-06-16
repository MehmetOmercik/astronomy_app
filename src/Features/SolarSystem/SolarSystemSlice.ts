import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateObject {
  title: string;
  description: string;
  table: object;
}
const initialState = {
  title: "default title",
  description: "default description",
  table: {
    header: ["2017-12-20T08:00:00.000+01:00"],
    rows: [
      {
        entry: {
          id: "earth",
          name: "Earth",
        },
        cells: [
          {
            date: "2017-12-20T08:00:00.000+01:00",
            id: "earth",
            name: "Earth",
            distance: {
              fromEarth: {
                au: "0.00004",
                km: "6365.08900",
              },
            },
            position: {
              horizontal: {
                altitude: {
                  degrees: "-89.81",
                  string: "-90° 11' 24\"",
                },
                azimuth: {
                  degrees: "360.00",
                  string: "360° 0' 0\"",
                },
              },
              horizonal: {
                altitude: {
                  degrees: "-89.81",
                  string: "-90° 11' 24\"",
                },
                azimuth: {
                  degrees: "360.00",
                  string: "360° 0' 0\"",
                },
              },
              equatorial: {
                rightAscension: {
                  hours: "0.93",
                  string: "00h 55m 48s",
                },
                declination: {
                  degrees: "-51.42",
                  string: "-52° 34' 48\"",
                },
              },
              constellation: {
                id: "phe",
                short: "Phe",
                name: "Phoenix",
              },
            },
            extraInfo: {
              elongation: null,
              magnitude: null,
            },
          },
        ],
      },
    ],
  },
} as initialStateObject;

const solarSystemSlice = createSlice({
  name: "solarSystem",
  initialState,
  reducers: {
    updateTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    updateDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    updateTable(state, action: PayloadAction<object>) {
      state.table = action.payload;
    },
  },
});

export const { updateTitle, updateDescription, updateTable } = solarSystemSlice.actions;
export default solarSystemSlice.reducer;
