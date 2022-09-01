import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import React, { Component }  from 'react';
import  Test  from "../components/mui";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* <Test /> */}
      <div className="button-container">
        <Button onClick={()=>{navigate("/Login",{ replace:true})}}>Login</Button>
        <Button onClick={()=>{navigate("/Register",{ replace:true})}}>Register</Button>
      </div>
    </div>
  );
};
