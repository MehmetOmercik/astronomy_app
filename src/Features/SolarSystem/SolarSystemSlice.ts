import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateObject {
  title: string;
  description: string;
  data: object;
}
const initialState = {
  title: "default title",
  description: "default description",
  data: { data: "data" },
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
    updateData(state, action: PayloadAction<object>) {
      state.data = action.payload;
    },
  },
});

export const { updateTitle, updateDescription, updateData } = solarSystemSlice.actions;
export default solarSystemSlice.reducer;
