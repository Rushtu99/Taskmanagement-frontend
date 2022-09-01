import React from "react";
import { useState, useEffect } from "react";
import { setUser, removeUser } from "../reducers/userSlice";
import { setUsers } from "../reducers/allUsersSlice";
import { setTasks } from "../reducers/taskSlice";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";
import { Tab, Tabs, Button } from "react-bootstrap";
import Test from "./mui";
import {ProfileTab} from './ProfileTab';
import { TasksTab } from "./TasksTab";
import { UsersTab }  from './UsersTab';


export const Panel = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  let user = useSelector((state) => state.user);
  let task = useSelector((state) => state.task);
  const dispatch = useDispatch();
  
  let tasks = async () => {
    try {
      let res = await api.getTasks();
      //console.log(user.data.id)
      dispatch(setTasks(res.data));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    setShowTasks(true);

    console.log("bob");
  };

  let users = async () => {
    try {
      let res = await api.getUsers();
      dispatch(setUsers(res.data));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    setShowUsers(true);

    console.log("bob");
  };

  return (
    <div style={{ marginTop: "10px", padding: "10px"}}>
      <Tabs
        defaultActiveKey="Profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Profile" title="Profile">
          <ProfileTab />
        </Tab>
        <Tab eventKey="Tasks" title="Tasks">
          <div>
            <div className="button-refresh">
              <Button onClick={tasks} className="refresh" variant="light">
                &#8634;
              </Button>
            </div>
            {showTasks && <TasksTab />}
          </div>
        </Tab>
        
        <Tab eventKey="Users" title="Users">
        <div>
            <div className="button-refresh">
              <Button onClick={users} className="refresh" variant="light">
                &#8634;
              </Button>
            </div>
            {showUsers && <UsersTab />}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

{
  /* <h1>Panel</h1>
    <div>{user.data.id}</div>
    <div>{user.data.name}</div>
    <div>{user.data.email}</div>
    <div>{user.data.email_verified_at}</div>
    <div>{user.data.created_at}</div> */
}
