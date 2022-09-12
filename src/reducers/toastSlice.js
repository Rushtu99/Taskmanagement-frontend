import { createSlice } from "@reduxjs/toolkit";

export const toastSlice = createSlice({
  name: "toast",
  initialState: {
    data: {},
    showTask:false,
    showRole:false
  },
  reducers: {
    setData: (state,action) => {
      state.data = action.payload;
    },
    removeData: (state) => {
      state.data = {};
    },
    toggleShowTask:(state)=>{
        state.showTask = !state.showTask;
    },
    toggleShowRole:(state)=>{
      state.showRole = !state.showRole;
  }
  },
});

export const { setData, removeData, toggleShowTask , toggleShowRole} = toastSlice.actions;
export default toastSlice.reducer;
