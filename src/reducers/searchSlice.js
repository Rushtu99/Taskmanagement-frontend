import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    data: "",
    sort:"Due Date"
  },

  reducers: {
    setSearch: (state, action) => {
      state.data = action.payload;
    },
    removeSearch: (state) => {
      state.data = {};
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setSearch,removeSearch,setSort } = searchSlice.actions;
export default searchSlice.reducer;
