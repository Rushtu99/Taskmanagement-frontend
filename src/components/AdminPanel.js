import React from "react";
import { Card, Dropdown, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";
import { useState } from "react";
import { setTasks, getTasks } from "../reducers/taskSlice";
import { getAllTasks } from "../reducers/allTasksSlice";
import ReactPaginate from "react-paginate";
import { useEffect } from "react";
import {setPage} from "../reducers/paginatorSlice";

export const AdminPanel = () => {
  const [searchParam] = useState(["title", "desc", "status","assigned_to_name","assigned_by_name"]);
  const paginator = useSelector((state)=>state.paginator);
  const [checkedState, setCheckedState] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [showBulk, setShowBulk] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [total,setTotal] = useState(0);
  let allTasks = useSelector((state) => state.allTasks);
  let sea = useSelector((state) => state.search);
  const dispatch = useDispatch();

  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(sea.data.toLowerCase()) > -1
        );
      });
    });
  }

  function paginateTasks(tasks) {
    let t = tasks.filter((item,index) => {
      return (index>=(paginator.page-1)*paginator.perPage && index <paginator.page*paginator.perPage)
    });
    console.log(t);
    return t;
  }

  useEffect(() => {
    dispatch(setPage(1));
    console.log("called")
    dispatch(getAllTasks()).then((res) => {
      setTotal(res.payload.length);
    }).then((res)=>{
      setShowPage(true);
    })
    console.log(paginator.page);
  }, []);

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
      {showPage && paginateTasks(search(allTasks.data)).map((task) => (
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
      <button onClick={() => dispatch(setPage(paginator.page - 1))} disabled={paginator.page==1}>Previous</button>
      <button onClick={() => {dispatch(setPage(paginator.page + 1)); console.log(total)}} disabled={paginator.page*paginator.perPage>total}>Next</button>
    </div>
  );
};
