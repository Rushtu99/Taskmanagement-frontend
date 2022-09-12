import React from "react";
import { Button, Tabs, Tab } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AdminTaskTab } from "./AdminTaskTab";
import api from "../services/api";
import { useState } from "react";
import { setTasks } from "../reducers/taskSlice";

export const AdminTab = () => {
  const [showAllTasks, setShowAllTasks] = useState(false);

  const dispatch = useDispatch();

  let tasks = async () => {
    try {
      let res = await api.getAllTasks();
      dispatch(setTasks(res.data));
    } catch (err) {
      console.log(err);
    }
    setShowAllTasks(true);
  };

  return (
    <Tabs
      defaultActiveKey="Profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="Tasks" title="Tasks">
        <div>
          <div className="button-refresh">
            <Button onClick={tasks} className="refresh" variant="light">
              &#8634;
            </Button>
          </div>
          {showAllTasks && <AdminTaskTab />}
        </div>
      </Tab>
    </Tabs>
  );
};
