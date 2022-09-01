import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    data: {},
  },
  reducers: {
    setTasks: (state,action) => {
      state.data = action.payload;
    },
    removeTasks: (state) => {
      state.data = {};
    },
  },
});

export const { setTasks, removeTasks } = taskSlice.actions;
export default taskSlice.reducer;
