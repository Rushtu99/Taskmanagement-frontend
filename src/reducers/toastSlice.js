import { createSlice } from "@reduxjs/toolkit";

export const toastSlice = createSlice({
  name: "toast",
  initialState: {
    data: {},
    show:false
  },
  reducers: {
    setData: (state,action) => {
      state.data = action.payload;
    },
    removeData: (state) => {
      state.data = {};
    },
    toggleShow:(state)=>{
        state.show = !state.show;
    }
  },
});

export const { setData, removeData, toggleShow } = toastSlice.actions;
export default toastSlice.reducer;
