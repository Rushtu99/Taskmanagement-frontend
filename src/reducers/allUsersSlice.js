import { createSlice } from "@reduxjs/toolkit";

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: {
    data: {},
  },
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload;
    },
    removeUsers: (state) => {
      state.data = {};
    },
  },
});

export const { setUsers, removeUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;
