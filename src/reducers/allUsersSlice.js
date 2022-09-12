import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const getAllUsers = createAsyncThunk("allUsers/getAllUsers",async () => {
    let res = await api.getAllUsers();
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
      console.log("gggg")
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
