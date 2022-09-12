import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export const Register = () => {
  const navigate = useNavigate();

  const Register = async(event) => {
    event.preventDefault();
     let res = await api.register(event);
      if (res.data) {
        navigate("/Login", { replace: true });
      }
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
          <Button
            type="submit"
            variant="outline-dark"
            style={{ color: "white", border: " 1px solid white" }}
            value="Register"
          >
            Register
          </Button>
        </div>
        <div className="button-container">
          <Button
            variant="outline-dark"
            style={{ color: "white", border: " 1px solid white" }}
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
