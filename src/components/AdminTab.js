import React, { useEffect, useState } from "react";
import { Card, Dropdown, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";
import taskSlice, { getTasks } from "../reducers/taskSlice";
import { getAllTasks } from "../reducers/allTasksSlice";
import { setPage } from "../reducers/paginatorSlice";
import NavbarMain from "./Navbar";
import Paginator from "./Paginator";
import { setSort } from "../reducers/searchSlice";

export const AdminTab = () => {
  // const [searchParam] = useState([
  //   "title",
  //   "desc",
  //   "status",
  //   "assigned_to_name",
  //   "assigned_by_name",
  // ]);
  let allTasks = useSelector((state) => state.allTasks);
  let sea = useSelector((state) => state.search);

  const paginator = useSelector((state) => state.paginator);
  const [showPage, setShowPage] = useState(false);
  const [total, setTotal] = useState(0);

  const [checkedState, setCheckedState] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [showBulk, setShowBulk] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage(1));
    console.log("called");
    dispatch(getAllTasks(paginator.page))
      .then((res) => {
        setTotal(res.payload.length);
      })
      .then((res) => {
        setShowPage(true);
      });
    console.log(paginator.page);
  }, []);

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

  let set = async (stat, task) => {
    if (task.status !== stat) {
      await api
        .changeStatus(task, stat)
        .then(dispatch(getTasks()))
        .then(dispatch(getAllTasks()));
    }
  };

  let handleDeleteBulk = async () => {
    checkedState.map((check) => {
      console.log(check);
    });
    await api
      .changeTaskStatusBulk(checkedState, bulkAction)
      .then(dispatch(getTasks()))
      .then(dispatch(getAllTasks()));
  };

  let handleSort = (sort) => {
    dispatch(setSort(sort));
    dispatch(getAllTasks());
    dispatch(setSort(sort));
    dispatch(setPage(1));
  };

  let handleCheck = (e) => {
    let id = e.target.id;
    if (checkedState.includes(id)) {
      let copy = [...checkedState];
      var index = copy.indexOf(e.target.id);
      copy.splice(index, 1);
      setCheckedState((checkedState) => copy);
      console.log(checkedState);

      if (checkedState.length == 1) {
        setShowBulk(false);
      }
    } else {
      setCheckedState((checkedState) => [...checkedState, id]);
      setShowBulk(true);
    }
  };

  return (
    <div>
      <NavbarMain />
      <div className="container-custom">
        <div className="float">
          <h2>Admin</h2>
          <div style={{ marginLeft: "auto" }}>
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {sea.sort}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <NavDropdown.Item
                  onClick={() => {
                    handleSort("Title");
                  }}
                >
                  Title
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    handleSort("Due Date");
                  }}
                >
                  Due Date
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    handleSort("Assigned By");
                  }}
                >
                  Assigned By
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    handleSort("Assigned To");
                  }}
                >
                  Assigned To
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    handleSort("Status");
                  }}
                >
                  Status
                </NavDropdown.Item>
              </Dropdown.Menu>

            </Dropdown>
          </div>
        </div>
        {showBulk && (
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div>BULK ACTION</div>
            <div style={{ display: "flex", marginLeft: "auto", gap: "10px" }}>
              <Button variant="dark" onClick={handleDeleteBulk}>
                Go
              </Button>
              <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  {bulkAction}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <NavDropdown.Item
                    onClick={() => {
                      setBulkAction("InProgress");
                    }}
                  >
                    In Progress
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      setBulkAction("Completed");
                    }}
                  >
                    Completed
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      setBulkAction("Deleted");
                    }}
                  >
                    Deleted
                  </NavDropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        )}
        {showPage ? (
          allTasks.data.data.map((task) => (
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
                <div style={{ marginRight: "10px" }}>
                  <input
                    style={{ width: "18px", height: "18px" }}
                    id={task.id}
                    type="checkbox"
                    onChange={(e) => {
                      handleCheck(e);
                    }}
                  />
                </div>

                <div>
                  <h4>{task.title}</h4>
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
                      >
                        In Progress
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => {
                          set("Completed", task);
                        }}
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
                <Card.Body style={{ padding: "0" }}>
                  <div className="float">
                    <div>Status: {task.status} </div>
                    <h5 style={{ marginLeft: "auto" }}>
                      Deadline: {task.due_date}
                    </h5>
                  </div>
                </Card.Body>
                {task.desc}
              </Card>
            </Card>
            // </div>
          ))
        ) : (
          <h1>Loading....</h1>
        )}
        {showPage && <Paginator type="admin" last={allTasks.data.last_page} />}
      </div>
    </div>
  );
};
