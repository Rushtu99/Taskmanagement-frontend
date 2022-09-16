import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/userSlice";
import taskReducer from "./reducers/taskSlice";
import allUsersReducer from "./reducers/allUsersSlice";
import allTasksReducer from "./reducers/allTasksSlice";
import toastReducer from "./reducers/toastSlice";
import searchReducer from "./reducers/searchSlice";
import paginatorReducer from "./reducers/paginatorSlice";
import notifReducer from "./reducers/notifSlice";

export const mystore = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    allUsers: allUsersReducer,
    allTasks: allTasksReducer,
    toast: toastReducer,
    search: searchReducer,
    paginator: paginatorReducer,
    notif: notifReducer,
  },
});
