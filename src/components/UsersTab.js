import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, removeUser, setTasks, setAdmin } from "../reducers/userSlice";
import { setData, removeData, toggleShow } from "../reducers/toastSlice";
import AuthService from "../services/api";
import { Card, Button, Dropdown, NavDropdown, Navbar } from "react-bootstrap";
import TaskToast from "./AssignTaskToast";
export const UsersTab = () => {
  let users = useSelector((state) => state.allUsers);
  let toast = useSelector((state) => state.toast);
  let dispatch = useDispatch();

  let cal = (data) => {
    if (!toast.show) {
      dispatch(setData(data));
      dispatch(toggleShow());
    } else {
      if (data == toast.data) {
        dispatch(toggleShow());
      } else {
        dispatch(setData(data));
      }
    }
    console.log("hello");
  };

  return (
    <div>
      <TaskToast></TaskToast>
      {users.data.map((user) => (
        <Card key={user.id} className="task-card">
          {/* <Navbar
          variant="dark"
          bg="dark"
          style={{ color: "white", padding: "15px" }}
          expand="lg"
        >
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <NavDropdown.Item href="#/action-1">
                  Action
                </NavDropdown.Item>
                <NavDropdown.Item href="#/action-2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#/action-3">
                  Something else
                </NavDropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="outline-dark"
              style={{ color: "grey" }}
              onClick={()=>{cal()}}
            >
              change status
            </Button>
          </div>
          <div style={{ marginLeft: "auto" }}>
            By: {user.assigned_by_name}{" "}
          </div>
        </Navbar> */}
          <Card body>
            <Card.Title>
              <div className="float">
                <div>
                  <div style={{ fontSize: 15 }}>ID:{user.id}</div>
                  <div>Name: {user.name} </div>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  {" "}
                  <Button
                    variant="outline-dark"
                    style={{ color: "grey" }}
                    onClick={() => {
                      cal(user);
                    }}
                  >
                    Assign Task
                  </Button>
                </div>
              </div>
            </Card.Title>
          </Card>
        </Card>
        // </div>
      ))}
    </div>
  );
};
