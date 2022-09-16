import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../services/api";


// export const getAllTasks = createAsyncThunk(
//   "allTasks/getAllTasks",
//   async (page) => {
//     let res = await api.getAllTasks(page);
//     return res.data;
//   }
// );
// export const getAllUsers = createAsyncThunk(
//   "allUsers/getAllUsers",
//   async () => {
//     let res = await api.getAllUsers();
//     return res.data;
//   }
// );

// export const getTasks = createAsyncThunk(
//   "task/getTasks",
//   async (obj, { dispatch, getState }) => {
//     let { user } = getState();
//     let res = await api.getTasks(user.data.id);
//     if (res.status === 200) {
//       let a = 0;
//       let b = 0;
//       let c = 0;
//       res.data.map((t) => {
//         if (t.status === "assigned") {
//           a++;
//         }
//         if (t.status === "In Progress") {
//           b++;
//         }
//         if (t.status === "Completed") {
//           c++;
//         }
//       });
//       dispatch(setCountAssigned(a));
//       dispatch(setCountInProgress(b));
//       dispatch(setCountCompleted(c));
//     }
//     return res.data;
//   }
// );

export const paginatorSlice = createSlice({
  name: "paginator",
  initialState: {
    page: 1,
    perPage: 10,
  },

  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
  },
});

export const { setPage, setPerPage } = paginatorSlice.actions;
export default paginatorSlice.reducer;
