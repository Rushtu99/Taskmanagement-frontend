import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    data: " ",
  },

  reducers: {
    setSearch: (state, action) => {
      state.data = action.payload;
    },
    removeSearch: (state) => {
      state.data = {};
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
