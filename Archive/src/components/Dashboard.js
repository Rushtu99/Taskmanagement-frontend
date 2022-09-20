import React from "react";
import { Panel } from "./Panel";
import { AdminPanel } from "./AdminPanel";
import AuthService from "../services/authenticate";


export const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={()=>{AuthService.isAdmin()}}> clicky click</button>
      <Panel />
      <AdminPanel />
    </div>
  );
};
