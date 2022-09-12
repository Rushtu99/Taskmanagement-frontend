import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (obj, { dispatch, getState }) => {
    let { user } = getState();
    let res = await api.getTasks(user.data.id);
    if (res.status === 200) {
      let a = 0;
      let b = 0;
      let c = 0;
      console.log("updating tasks");
      res.data.map((t) => {
        if (t.status === "assigned") {
          a++;
        }
        if (t.status === "In Progress") {
          b++;
        }
        if (t.status === "Completed") {
          c++;
        }
      });
      dispatch(setCountAssigned(a));
      dispatch(setCountInProgress(b));
      dispatch(setCountCompleted(c));
    }
    return res.data;
  }
);

export const taskSlice = createSlice({
  name: "task",

  initialState: {
    data: [],
    count: {
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
      state.data = {};
    },
    setCountAssigned: (state, action) => {
      state.count.assigned = action.payload;
    },
    setCountInProgress: (state, action) => {
      state.count.inProgress = action.payload;
    },
    setCountCompleted: (state, action) => {
      state.count.completed = action.payload;
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
  setCountAssigned,
  setCountInProgress,
  setCountCompleted,
} = taskSlice.actions;
export default taskSlice.reducer;
