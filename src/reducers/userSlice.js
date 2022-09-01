import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
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
    setAdmin: (state,action)=>{
      state.admin = action.payload;
    },
  },
});

export const { setUser, removeUser, setAdmin } = userSlice.actions;
export default userSlice.reducer;
