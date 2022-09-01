import React, { useEffect } from "react";
import { Panel } from "./Panel";
import { AdminPanel } from "./AdminPanel";
import api from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import { setUser, removeUser, setAdmin } from "../reducers/userSlice";
import { setTasks, removeTasks } from "../reducers/taskSlice";
import { Navbar, Container, Accordion } from "react-bootstrap";
import { useNavigate } from "react-router";
import { setUsers } from "../reducers/allUsersSlice";



export const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const task = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(()=>{async function bob() {
    await (userSet());
    await (adminGet());
    await (taskGet());
    // await (usersGet())
  }
  bob();
}, []);



  const usersGet = async () => {
    try {
      let res = await api.getUsers();
      console.log(res.data);

      dispatch(setUsers(res.data))
    } catch (err) {
      console.log(err);
    }
  };


  const LogOut = async () => {
    try {
      let res = await api.logout();
      dispatch(removeUser());
      localStorage.removeItem("user");

      navigate("/", { replace: true });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const taskGet = async () => {
    try {
      let res = await api.getTasks(user.data.id);
      console.log(user.data.id);
      dispatch(setTasks(res.data));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const adminGet = async () => {
    try {
      let res = await api.isAdmin();
      if(res.data==1){
        dispatch(setAdmin(true));
      }
      if(res.data==0){
        dispatch(setAdmin(false));
      }

      console.log(res.data);

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const userSet = async () => {
    try {
      let res = await api.me();
      if (res) {
        console.log("setting user");
        dispatch(setUser(res.data));
      } else {
        console.log("no one logged in");
        navigate("/Login", { replace: true });
      }
    } catch (err) {
      console.log("no one logged in");
      navigate("/Login", { replace: true });
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar bg="dark">
        <Container style={{ color: "white" }}>
          <h1>Dashboard</h1>
        </Container>
      </Navbar>
      <div style={{ margin: "10px" }}>
        <button onClick={adminGet}> set admin</button>
        <button onClick={usersGet}> Get all Users</button>
        <button onClick={LogOut}> Log Out</button>
        <button onClick={userSet}> set user</button>
        {/* <button onClick={usersGet}> UsersGet</button> */}
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Panel</Accordion.Header>
            <Accordion.Body>
              <Panel />
            </Accordion.Body>
          </Accordion.Item>
              {false && <Accordion.Item eventKey="2">
                <Accordion.Header>Admin</Accordion.Header>
                <Accordion.Body>
                  <AdminPanel />
                </Accordion.Body>
              </Accordion.Item>}
        </Accordion>
      </div>
    </div>
  );
};
