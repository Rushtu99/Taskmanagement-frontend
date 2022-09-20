import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authenticate";

export const Login = () => {
  const navigate = useNavigate();

  const Login = (event) => {
    event.preventDefault();
    let promise = AuthService.login(event);
    promise.then((res) => {
      console.log(res);
      if (res.data.access_token) {
        navigate("/Dashboard", { replace: true });
      }
    });
  };

  const renderForm = (
    <div className="form">
      <form id="login-form" onSubmit={Login}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="email" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
        </div>
        <div className="button-container">
          <Button type="submit">LOGIN</Button>
        </div>
        <div className="button-container">
          <Button
            onClick={() => {
              navigate("/Register", { replace: true });
            }}
          >
            Dont have account?
          </Button>
        </div>
      </form>
    </div>
  );

  return <div className="login-form">{renderForm}</div>;
};
