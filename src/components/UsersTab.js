import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setData,
  toggleShowTask,
  toggleShowRole,
} from "../reducers/toastSlice";
import { Card, Button, Dropdown, NavDropdown } from "react-bootstrap";
import TaskModal from "./AssignTaskModal";
import RoleModal from "./AssignRoleModal";
import { useState } from "react";
import { setPage } from "../reducers/paginatorSlice";
import { getAllUsers } from "../reducers/allUsersSlice";
import NavbarMain from "./Navbar";
import Paginator from "./Paginator";
import { setSort } from "../reducers/searchSlice";

export const UsersTab = () => {
  let users = useSelector((state) => state.allUsers);
  let user = useSelector((state) => state.user);
  let toast = useSelector((state) => state.toast);

  const paginator = useSelector((state) => state.paginator);
  const [showPage, setShowPage] = useState(false);
  const [total, setTotal] = useState(0);

  let sea = useSelector((state) => state.search);

  const [searchParam] = useState(["name", "id"]);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage(1));
    dispatch(getAllUsers())
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
        if (data == toast.data) {
          dispatch(toggleShowRole());
        } else {
          dispatch(setData(data));
        }
      }
    }
  };

  return (
    <div>
      <NavbarMain />
      <TaskModal />
      <RoleModal />
      <div className="container-custom">
        <div className="float">
          <h2>Users</h2>
        </div>
        {showPage ? (
          users.data.data.map((user) => (
            <Card key={user.id} className="task-card">
              <Card body>
                <Card.Body style={{ padding: "0" }}>
                  <div className="float">
                    <div>
                      <div style={{ fontSize: 15 }}>ID:{user.id}</div>
                      <div>Name: {user.name} </div>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      {" "}
                      <Button
                        variant="outline-dark"
                        style={{ color: "grey", marginRight: "5x" }}
                        onClick={() => {
                          checkRoleRole(user);
                        }}
                      >
                        Role
                      </Button>
                      <Button
                        variant="outline-dark"
                        style={{ color: "grey", marginLeft: "5px" }}
                        onClick={() => {
                          checkTaskRole(user);
                        }}
                      >
                        Assign Task
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Card>
            // </div>
          ))
        ) : (
          <h1>Loading....</h1>
        )}
        {showPage && <Paginator type="user" last={users.data.last_page} />}
      </div>
    </div>
  );
};
