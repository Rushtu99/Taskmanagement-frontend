import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authenticate";

export const Register = () => {
  const navigate = useNavigate();

  const Register = (event) => {
    event.preventDefault();
    let promise = AuthService.register(event);
    promise.then((res) => {
      console.log(res);
    });
  };

  const renderForm = (
    <div className="form">
      <form id="login-form" onSubmit={Register}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="name" required />
        </div>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="email" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
        </div>
        <div className="button-container">
          <Button type="submit" name="butt1" variant="primary" value="Register">
            Register
          </Button>
        </div>
        <div className="button-container">
          <Button
            onClick={() => {
              navigate("/Login", { replace: true });
            }}
          >
            Already have account?
          </Button>
        </div>
      </form>
    </div>
  );

  return <div className="login-form">{renderForm}</div>;
};
