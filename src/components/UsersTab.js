import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setData, toggleShowTask, toggleShowRole } from "../reducers/toastSlice";
import { Card, Button } from "react-bootstrap";
import TaskModal from "./AssignTaskModal";
import RoleModal from "./AssignRoleModal";
import { useState } from "react";

export const UsersTab = () => {
  let users = useSelector((state) => state.allUsers);
  let user = useSelector((state) => state.user);
  let toast = useSelector((state) => state.toast);
  let sea = useSelector((state) => state.search);
  const [searchParam] = useState(["name", "id"]);

  let dispatch = useDispatch();


  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(sea.data.toLowerCase()) > -1
        );
      });
    });
  }

  let checkTaskRole = (data) => {
    if (user.admin || user.data.id === data.id) {
      if (!toast.showTask) {
        dispatch(setData(data));
        dispatch(toggleShowTask());
      } else {
        if (data === toast.data) {
          dispatch(toggleShowTask());
        } else {
          dispatch(setData(data));
        }
      }
    }
  };

  let checkRoleRole = (data) => {
    if (user.admin) {
      if (!toast.showTask) {
        dispatch(setData(data));
        dispatch(toggleShowRole());
      } else {
        if (data === toast.data) {
          dispatch(toggleShowRole());
        } else {
          dispatch(setData(data));
        }
      }
    }
  };
  
  return (
    <div>
      <TaskModal/>
      <RoleModal/>
      {search(users.data).map((user) => (
        <Card key={user.id} className="task-card">
          <Card body>
            <Card.Title>
              <div className="float">
                <div>
                  <div style={{ fontSize: 15 }}>ID:{user.id}</div>
                  <div>Name: {user.name} </div>
                </div>
                <div style={{ marginLeft: "auto"}}>
                  {" "}
                  <Button
                    variant="outline-dark"
                    style={{ color: "grey", marginRight:"5x" }}
                    onClick={() => {
                      checkRoleRole(user);
                    }}
                  >
                    Role
                  </Button>
                  <Button
                    variant="outline-dark"
                    style={{ color: "grey",marginLeft:"5px" }}
                    onClick={() => {
                      checkTaskRole(user);
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
