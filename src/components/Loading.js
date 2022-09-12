import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTasks } from "../reducers/taskSlice";
import { getAllTasks } from "../reducers/allTasksSlice";
import { getUser } from "../reducers/userSlice";
import { getAllUsers } from "../reducers/allUsersSlice";
import { useNavigate } from "react-router";

export const Loading = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    init().then(() => navigate("/Dashboard", { replace: true }));
  }, []);
  async function init() {
    await dispatch(getUser()).then((res) => {
      if (res.type == "user/getUser/rejected") {
        navigate("/Login", { replace: true });
      }
      if (res.payload.role == 1) {
        dispatch(getAllTasks());
      }
    });
    await dispatch(getTasks());

    await dispatch(getAllUsers());
  }

  return <div>Loading</div>;
};
