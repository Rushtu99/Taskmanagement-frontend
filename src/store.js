import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/userSlice"
import taskReducer from "./reducers/taskSlice"
import allUserReducer from "./reducers/allUsersSlice"
import toastReducer from "./reducers/toastSlice"
export const mystore = configureStore({
    reducer:{
        user:userReducer,
        task:taskReducer,
        allUsers:allUserReducer,
        toast:toastReducer
        }
});