import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getTasks } from "../reducers/taskSlice";
import { getAllTasks } from "../reducers/allTasksSlice";
import { getUser } from "../reducers/userSlice";
import { getAllUsers } from "../reducers/allUsersSlice";
import { useNavigate } from "react-router";
import Pusher from "pusher-js";
export const Loading = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let paginator = useSelector((state)=>state.paginator)
  useEffect(() => {
    init().then(() => navigate("/Dashboard/profile", { replace: true }));
  }, []);

  async function init() {
    

    await dispatch(getUser()).then((res) => {
      if (res.type == "user/getUser/rejected") {
        navigate("/Login", { replace: true });
      }
      var pusher = new Pusher("952cfcc3e466664b7632", {
        cluster: "ap2",
      });
      Pusher.logToConsole = true;
      var channel = pusher.subscribe("my-channel-" + res.payload.id);
      channel.bind("Task Assigned", function (data) {
        alert(JSON.stringify(data));
      });

      if (res.payload.role == 1) {
        dispatch(getAllTasks(paginator.page));
      }
    });

    await dispatch(getTasks(paginator.page));
    await dispatch(getAllUsers(paginator.page));
  }

  return <div>Loading</div>;
};
