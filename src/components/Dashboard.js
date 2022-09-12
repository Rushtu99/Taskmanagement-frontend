import React, { useEffect } from "react";
import { Panel } from "./Panel";
import { AdminPanel } from "./AdminPanel";
import api from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, getUser } from "../reducers/userSlice";
import { setSearch } from "../reducers/searchSlice";
import { getTasks, removeTasks } from "../reducers/taskSlice";
import { removeAllUsers, getAllUsers } from "../reducers/allUsersSlice";
import { Navbar, Container, Accordion, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getAllTasks } from "../reducers/allTasksSlice";
import { Analytics } from "./Analytics";

export const Dashboard = () => {
  const search = useSelector((state) => state.search);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    init();
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

  const LogOut = async () => {
    try {
      await api.logout();
      localStorage.removeItem("user");
      dispatch(removeUser());
      dispatch(removeTasks());
      dispatch(removeAllUsers());

      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar bg="dark">
        <Container style={{ color: "white" }}>
          <h1>Dashboard</h1>
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for Tasks..."
              value={search.data}
              onChange={(e) => dispatch(setSearch(e.target.value))}
            />
          </label>
          <div className="button-nav">
            <Button variant="dark" onClick={init}>
              {" "}
              Init
            </Button>
            <Button variant="dark" onClick={LogOut}>
              {" "}
              Log Out
            </Button>
            {/* <button onClick={userSet}> set user</button> */}
            {/* <button onClick={analytics}> analytics</button> */}
          </div>
        </Container>
      </Navbar>
      <div style={{ margin: "5px" }}>
        <Analytics />
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Panel</Accordion.Header>
            <Accordion.Body>
              <Panel />
            </Accordion.Body>
          </Accordion.Item>
          {false && (
            <Accordion.Item eventKey="2">
              <Accordion.Header>Admin</Accordion.Header>
              <Accordion.Body>
                <AdminPanel />
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      </div>
    </div>
  );
};
