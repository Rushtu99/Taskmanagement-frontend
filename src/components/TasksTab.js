import { Card, Button, Dropdown, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";
import { useState } from "react";

import { setTasks } from "../reducers/taskSlice";
export const TasksTab = () => {
  let user = useSelector((state) => state.user);
  let task = useSelector((state) => state.task);
  let dispatch = useDispatch();

  let set = async (stat,task) => {
    if(task.status !== stat){
      await api.changeStatus(task,stat);
      let res = await api.getTasks();
      dispatch(setTasks(res.data));
    }
  };
  
  return (
    <div>
      {task.data.map((task) => (
        <Card key={task.id} className="task-card">
          <Navbar
            variant="dark"
            bg="dark"
            style={{ color: "white", padding: "15px" }}
            expand="lg"
          >
            <div>
              <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  ChangeStatus
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <NavDropdown.Item
                    onClick={() => {
                      set("In Progress",task);
                    }}
                    href="#/action-1"
                  >
                    In Progress
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      set("Completed",task);
                    }}
                    href="#/action-2"
                  >
                    Completed
                  </NavDropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <Button
                variant="outline-dark"
                style={{ color: "grey" }}
                onClick={() => {
                  statusChange(task);
                }}
              >
                change status
              </Button> */}
            </div>
            <div style={{ marginLeft: "auto" }}>
              By: {task.assigned_by_name}{" "}
            </div>
          </Navbar>
          <Card body>
            <Card.Title>
              <div className="float">
                <div>Status: {task.status} </div>
                <div style={{ marginLeft: "auto" }}>
                  Deadline: {task.due_date}
                </div>
              </div>
            </Card.Title>
            {task.desc}
          </Card>
        </Card>
        // </div>
      ))}
    </div>
  );
};
