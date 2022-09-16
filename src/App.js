import "./App.css";
import React, { useEffect } from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { Loading } from "./components/Loading";
import { Dashboard } from "./components/Dashboard";
import { ResetPassword } from "./components/ResetPassword";
import { EmailVerification } from "./components/EmailVerification";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ProfileTab } from "./components/ProfileTab";
import { useDispatch } from "react-redux";
import { getTasks } from "./reducers/taskSlice";
import { getUser } from "./reducers/userSlice";
import { getAllUsers } from "./reducers/allUsersSlice";
import { getAllTasks } from "./reducers/allTasksSlice";
import { UsersTab } from "./components/UsersTab";
import { TasksTab } from "./components/TasksTab";
import { AdminTab } from "./components/AdminTab";
import { useNavigate } from "react-router-dom";

function App() {
  // const navigate = useNavigate(); 
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   init();
  // }, []);

  // async function init() {
  //   var pusher = new Pusher("952cfcc3e466664b7632", {
  //     cluster: "ap2",
  //   });
  //   //Pusher.logToConsole = true;

  //   await dispatch(getUser()).then((res) => {
  //     if (res.type == "user/getUser/rejected") {
  //       navigate("/Login", { replace: true });
  //     }
  //     let channel = pusher.subscribe("my-channel-" + res.payload.id);
  //     channel.bind("Task Assigned", function (data) {
  //       alert(JSON.stringify(data));
  //     });

  //     if (res.payload.role == 1) {
  //       dispatch(getAllTasks());
  //     }
  //   });
  //   await dispatch(getTasks());
  //   await dispatch(getAllUsers());
  // }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/refresh" element={<Loading />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email/verify" element={<EmailVerification />} />
          <Route path="/password/reset" element={<ResetPassword />} />
          <Route exact path="/dashboard/profile" element={<ProfileTab />} />
          <Route exact path="/dashboard/users" element={<UsersTab />} />
          <Route exact path="/dashboard/tasks" element={<TasksTab />} />
          <Route exact path="/dashboard/admin" element={<AdminTab />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
