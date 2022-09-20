import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { useSelector } from "react-redux";
export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (page,{ dispatch,getState }) => {
    const state = getState();

    let t = await api.getTasks(page,state.search.data,state.search.sort);
    api.stats('to').then((res)=>{
      dispatch(setCountAssignedTo(res.data[0]));
      dispatch(setCountInProgressTo(res.data[1]));
      dispatch(setCountCompletedTo(res.data[2]));
    })
    api.stats('by').then((res)=>{
      dispatch(setCountAssignedBy(res.data[0]));
      dispatch(setCountInProgressBy(res.data[1]));
      dispatch(setCountCompletedBy(res.data[2]));
    })
    return t.data;
  }
);

export const taskSlice = createSlice({
  name: "task",

  initialState: {
    data: [],
    to: {
      assigned: 0,
      inProgress: 0,
      completed: 0,
    },
    by: {
      assigned: 0,
      inProgress: 0,
      completed: 0,
    },
  },

  reducers: {
    setTasks: (state, action) => {
      state.data = action.payload;
    },
    removeTasks: (state) => {
      state.data = [];
    },
    setCountAssignedTo: (state, action) => {
      state.to.assigned = action.payload;
    },
    setCountInProgressTo: (state, action) => {
      state.to.inProgress = action.payload;
    },
    setCountCompletedTo: (state, action) => {
      state.to.completed = action.payload;
    },
    setCountAssignedBy: (state, action) => {
      state.by.assigned = action.payload;
    },
    setCountInProgressBy: (state, action) => {
      state.by.inProgress = action.payload;
    },
    setCountCompletedBy: (state, action) => {
      state.by.completed = action.payload;
    },
  },
  extraReducers: {
    [getTasks.pending]: (state, action) => {
      state.status = "pending";
    },
    [getTasks.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "fulfilled";
    },
    [getTasks.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const {
  setTasks,
  removeTasks,
  setCountAssignedTo,
  setCountInProgressTo,
  setCountCompletedTo,
  setCountAssignedBy,
  setCountInProgressBy,
  setCountCompletedBy,
} = taskSlice.actions;
export default taskSlice.reducer;
