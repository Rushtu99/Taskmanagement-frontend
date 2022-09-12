import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const getAllTasks = createAsyncThunk(
  "allTasks/getAllTasks",
  async () => {
    let res = await api.getAllTasks();
    return res.data;
  }
);

export const allTasksSlice = createSlice({
  name: "allTasks",
  initialState: {
    data: [],
  },
  reducers: {
    setAllTasks: (state, action) => {
      state.data = action.payload;
    },
    removeAllTasks: (state) => {
      state.data = {};
    },
  },
  extraReducers: {
    [getAllTasks.pending]: (state, action) => {
      state.status = "pending";
    },
    [getAllTasks.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "fulfilled";
    },
    [getAllTasks.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const { setAllTasks, removeAllTasks } = allTasksSlice.actions;
export default allTasksSlice.reducer;
