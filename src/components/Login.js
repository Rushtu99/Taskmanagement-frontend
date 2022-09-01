import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export const Login = () => {
  const navigate = useNavigate();

  const Login = (event) => {
    event.preventDefault();
    let promise = api.login(event);
    promise.then((res) => {
      console.log(res);
      if (res && res.data.access_token) {
        navigate("/Dashboard", { replace: true });
      }
    });
  };

  const renderForm = (
    <div>
      <div className="form">
        <Form id="login-form" class="mb-3" onSubmit={Login}>
          <div className="input-container">
            <Form.Label>Email </Form.Label>
            <input type="email" name="email" required />
          </div>
          <div className="input-container">
            <Form.Label>Password </Form.Label>
            <input type="password" name="password" required />
          </div>
          <div className="button-container">
            <Button
             variant="outline-dark"
             style={{ color: "white" ,border:' 1px solid white'}}
              type="submit"
            >
              LOGIN
            </Button>
          </div>
          <div className="button-container">
            <Button
              variant="outline-dark"
              style={{ color: "white" ,border:' 1px solid white'}}
              onClick={() => {
                navigate("/Register", { replace: true });
              }}
            >
              Dont have account?
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );

  return <div className="login-form">{renderForm}</div>;
};
