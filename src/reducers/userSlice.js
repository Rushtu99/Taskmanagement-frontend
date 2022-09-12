import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
// import { useNavigate } from "react-router";

export const getUser = createAsyncThunk("user/getUser", async (obj,{dispatch}) => {
  let res = await api.me();
  if(res.data.role===1){
    dispatch(setAdmin(true));
  }
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    admin: false,
  },
  reducers: {
    setUser: (state, action) => {
      //console.log(action.payload);
      state.data = action.payload;
    },
    removeUser: (state) => {
      state.data = {};
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.status = "pending";
    },
    [getUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "fulfilled";

      if (action.payload.role === 1) {
        state.admin = true;
      }
    },
    [getUser.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});
export const { setUser, removeUser, setAdmin } = userSlice.actions;
export default userSlice.reducer;
