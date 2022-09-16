import React from "react";
import { Form, Button } from "react-bootstrap";
import api from "../services/api";
import { useNavigate } from "react-router";
import { useState } from "react";
export const ResetPassword = () => {
  let navigate = useNavigate();
  let [match, setMatch] = useState(false);

  let callVerify = async (e) => {
    e.preventDefault();
    const urlToken = new URL (window.location.href);
    const token = urlToken.searchParams.get('token');
    const email = urlToken.searchParams.get('email');


    if (e.target[1].value !== e.target[2].value) {
      setMatch(true);
      return;
    } else {
      setMatch(false);
    }
    let password = e.target[1].value;
    let password_confirmation = e.target[2].value;
    let res = await api.resetPassword(email,password,password_confirmation,token);
    if (res) {
      navigate("/Dashboard", { replace: true });
    }
  };

  const Alert = (props) => {
    return <div style={{ color: "red" }}>password must match</div>;
  };
  return (
    <div>
      {match && <Alert />}
      <Form id="login-form" className="mb-3" onSubmit={callVerify}>
        <div className="input-container">
          <Form.Label>email </Form.Label>
          <input type="email" name="email" required />
        </div>
        <div className="input-container">
          <Form.Label>password </Form.Label>
          <input type="password" name="email" minlength="8" required />
        </div>
        <div className="input-container">
          <Form.Label>Confirm Password </Form.Label>
          <input type="password" name="password" required />
        </div>
        <div className="button-container">
          <Button
            variant="outline-dark"
            style={{ color: "white", border: " 1px solid white" }}
            type="submit"
          >
            RESET
          </Button>
        </div>
      </Form>
    </div>
  );
};
