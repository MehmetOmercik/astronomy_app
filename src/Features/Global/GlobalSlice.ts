import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateObject {
  path: string;
}
const initialState = {
  path: "/lol",
} as initialStateObject;

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updatePath(state, action: PayloadAction<string>) {
      state.path = action.payload;
    },
  },
});

export const { updatePath } = globalSlice.actions;
export default globalSlice.reducer;
