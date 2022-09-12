import {Card,Dropdown,Navbar,NavDropdown} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";
import { setTasks } from "../reducers/taskSlice";

export const AdminTaskTab = () => {
  let task = useSelector((state) => state.task);
  let dispatch = useDispatch();

  let set = async (stat, task) => {
    if (task.status !== stat) {
      await api.changeStatus(task, stat);
      let res = await api.getAllTasks();
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
