import { Card, Dropdown, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";
import { useState } from "react";
import { getTasks } from "../reducers/taskSlice";

export const TasksTab = () => {
  let task = useSelector((state) => state.task);
  let sea = useSelector((state) => state.search);
  let dispatch = useDispatch();

  const [searchParam] = useState(["title", "desc","status"]);

  let set = async (stat, task) => {
    if (task.status !== stat) {
      await api.changeStatus(task, stat);
      await dispatch(getTasks());
    }
  };

  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(sea.data.toLowerCase()) > -1
        );
      });
    });
  }
  
  let handleDelete = async(task)=>{
    await api.deleteTask(task.id);
    await dispatch(getTasks());

  }

  return (
    <div>
      

      {search(task.data).map((task) => (
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
            <div style={{ marginLeft: "auto" }}>
              To: {task.assigned_to_name}{" "}
              By: {task.assigned_by_name}{" "}
              <Button onClick={()=>{handleDelete(task)}} variant="dark">X</Button>{' '}

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
