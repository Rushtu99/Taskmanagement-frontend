import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { useSelector } from "react-redux";
export const getNotifs = createAsyncThunk("notif/getNotifs",async (obj,{getState}) => {

  const state = getState();

    let res = await api.getNotifications();
    return res.data;
  }
);
export const notifSlice = createSlice({
  name: "notif",
  initialState: {
    showCanvas: false,
    data:[]
  },
  reducers: {
    toggleShow: (state) => {
      state.showCanvas = !state.showCanvas;
    },
  },
  extraReducers: {
    [getNotifs.pending]: (state, action) => {
      state.status = "pending";
    },
    [getNotifs.fulfilled]: (state, action) => {
      state.data = action.payload;

      state.status = "fulfilled";
    },
    [getNotifs.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const { toggleShow } = notifSlice.actions;
export default notifSlice.reducer;
