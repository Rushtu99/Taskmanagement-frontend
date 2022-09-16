import { Card, Dropdown, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";
import { useState } from "react";
import { getTasks } from "../reducers/taskSlice";
import { getAllTasks } from "../reducers/allTasksSlice";
import { useEffect } from "react";
import { setPage } from "../reducers/paginatorSlice";
import NavbarMain from "./Navbar";
import Paginator from "./Paginator";
import moment from "moment";

export const TasksTab = () => {
  let tasks = useSelector((state) => state.task);
  let sea = useSelector((state) => state.search);
  let paginator = useSelector((state) => state.paginator);
  let dispatch = useDispatch();

  const [showPage, setShowPage] = useState(false);
  const [total, setTotal] = useState(0);

  // const [searchParam] = useState(["title", "desc", "status","assigned_to_name","assigned_by_name"]);

  useEffect(() => {
    dispatch(setPage(1));
    dispatch(getTasks(paginator.page))
      .then((res) => {
        setTotal(res.payload.length);
      })
      .then((res) => {
        setShowPage(true);
      });
    console.log(paginator.page);
  }, []);

  let set = async (stat, task) => {
    if (task.status !== stat) {
      await api.changeStatus(task, stat);
      await dispatch(getTasks());
    }
  };

  // function search(items) {
  //   return items.filter((item) => {
  //     return searchParam.some((newItem) => {
  //       return (
  //         item[newItem]
  //           .toString()
  //           .toLowerCase()
  //           .indexOf(sea.data.toLowerCase()) > -1
  //       );
  //     });
  //   });
  // }

  // function paginate(items) {
  //   let t = items.filter((item, index) => {
  //     return (
  //       index >= (paginator.page - 1) * paginator.perPage &&
  //       index < paginator.page * paginator.perPage
  //     );
  //   });
  //   console.log(t);
  //   return t;
  // }

  let handleDelete = async (task) => {
    await api.deleteTask(task.id);
    await dispatch(getTasks());
  };

  return (
    <div>
      <NavbarMain />
      <div className="container-custom">
        <h2>Tasks</h2>
        {showPage ? (
          tasks.data.data.map((task) => (
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
                  <h4>{task.title}</h4>
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
                  To: {task.assigned_to_name} By: {task.assigned_by_name}{" "}
                  <Button
                    onClick={() => {
                      handleDelete(task);
                    }}
                    variant="dark"
                  >
                    &times;
                  </Button>{" "}
                </div>
              </Navbar>
              <Card body>
                <Card.Body style={{padding:"0"}}>
                  <div className="float">
                    <div>Status: {task.status} </div>
                    <h5 style={{ marginLeft: "auto" }}>
                      Deadline:{" "}
                      {moment(moment.utc(task.due_date).toDate()).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </h5>
                  </div>
                </Card.Body>
                {task.desc}
              </Card>
            </Card>
          ))
        ) : (
          <h1>Loading....</h1>
        )}
        {showPage && <Paginator type="task" last={tasks.data.last_page} />}
        {/* </div> */}
      </div>
    </div>
  );
};
