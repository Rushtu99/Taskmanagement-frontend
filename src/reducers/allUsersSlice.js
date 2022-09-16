import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { useSelector } from "react-redux";
export const getAllUsers = createAsyncThunk("allUsers/getAllUsers",async (page,{getState}) => {

  const state = getState();

    let res = await api.getAllUsers(page,state.search.data);
    return res.data;
  }
);
export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: {
    data: [],
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.data = action.payload;
    },
    removeAllUsers: (state) => {
      state.data = [];
    },
  },
  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.status = "pending";
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.data = action.payload;

      state.status = "fulfilled";
    },
    [getAllUsers.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const { setAllUsers, removeAllUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;
