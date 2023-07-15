import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  searchList: [""],
  searchState: "loading",
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSearchList(state, action: PayloadAction<string[]>) {
      state.searchList = action.payload;
    },
    setSearchState(state, action: PayloadAction<"loading" | "loaded" | "error">) {
      state.searchState = action.payload;
    },
  },
});

export const { setSearchQuery, setSearchList, setSearchState } = searchSlice.actions;
export default searchSlice.reducer;
