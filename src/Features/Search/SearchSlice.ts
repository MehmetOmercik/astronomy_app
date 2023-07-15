import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  searchList: [{}],
  searchCurrent: [{}],
  searchState: "loading",
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSearchList(state, action) {
      state.searchList = action.payload;
    },
    setSearchCurrent(state, action) {
      state.searchCurrent = action.payload;
    },
    setSearchState(state, action: PayloadAction<"loading" | "loaded" | "error">) {
      state.searchState = action.payload;
    },
  },
});

export const { setSearchQuery, setSearchList, setSearchCurrent, setSearchState } =
  searchSlice.actions;
export default searchSlice.reducer;
