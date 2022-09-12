import React from "react";
import {  getAllUsers } from "../reducers/allUsersSlice";
import {  getTasks } from "../reducers/taskSlice";
import {  getAllTasks } from "../reducers/allTasksSlice";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs, Button } from "react-bootstrap";
import { ProfileTab } from "./ProfileTab";
import { TasksTab } from "./TasksTab";
import { UsersTab } from "./UsersTab";
import { AdminTab } from "./AdminTab";
export const Panel = () => {
  let user = useSelector((state) => state.user);
  let task = useSelector((state) => state.task);

  let allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: "10px", padding: "10px" }}>
      <Tabs
        defaultActiveKey="Profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Profile" title="Profile">
          <ProfileTab />
        </Tab>
        <Tab eventKey="Tasks" title="Tasks">
          <div>
            <div className="button-refresh">
              <Button
                onClick={() => {
                  dispatch(getTasks());
                }}
                className="refresh"
                variant="light"
              >
                &#8634;
              </Button>
            </div>
            {task.status === "fulfilled" && <TasksTab />}
          </div>
        </Tab>

        <Tab eventKey="Users" title="Users">
          <div>
            <div className="button-refresh">
              <Button
                onClick={() => {
                  dispatch(getAllUsers());
                }}
                className="refresh"
                variant="light"
              >
                &#8634;
              </Button>
            </div>
            {allUsers.status && <UsersTab />}
          </div>
        </Tab>
        {user.admin && (
          <Tab eventKey="Admin" title="Admin">
            <div>
              <div className="button-refresh">
                <Button
                  onClick={() => {
                    dispatch(getAllTasks());
                  }}
                  className="refresh"
                  variant="light"
                >
                  &#8634;
                </Button>
              </div>
              {user.admin && <AdminTab />}
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};