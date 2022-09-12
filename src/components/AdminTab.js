import React from "react";
import { Card, Dropdown, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";
import { useState } from "react";
import { setTasks } from "../reducers/taskSlice";

export const AdminTab = () => {
  const [searchParam] = useState(["title", "desc","status"]);

  let allTasks = useSelector((state) => state.allTasks);
  let sea = useSelector((state) => state.search);

  const dispatch = useDispatch();

  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(sea.data.toLowerCase()) > -1
        );
      });
    });
  }

  let set = async (stat, task) => {
    if (task.status !== stat) {
      await api.changeStatus(task, stat);
      let res = await api.getTasks();
      dispatch(setTasks(res.data));
    }
  };

  return (
    <div>
      {search(allTasks.data).map((task) => (
        <Card key={task.id} className="task-card">
          <Navbar
            variant="dark"
            bg="dark"
            style={{
              color: "white",
              paddingLeft: "10px",
              paddingRight: "10px",
              paddingTop: "1px",
              paddingBottom: "1px",
            }}
            expand="lg"
          >
            <div>
              <div>{task.title}</div>
            </div>
            <div>
              <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  ChangeStatus
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <NavDropdown.Item
                    onClick={() => {
                      set("In Progress", task);
                    }}
                    href="#/action-1"
                  >
                    In Progress
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      set("Completed", task);
                    }}
                    href="#/action-2"
                  >
                    Completed
                  </NavDropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div style={{ marginLeft: "auto" }}>
              To: {task.assigned_to_name} By: {task.assigned_by_name}{" "}
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
