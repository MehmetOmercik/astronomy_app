import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateObject {
  title: string;
  description: string;
}
const initialState = {
  title: "default title",
  description: "default description",
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
  },
});

export const { updateTitle, updateDescription } = solarSystemSlice.actions;
export default solarSystemSlice.reducer;
