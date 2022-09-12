import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ReCAPTCHA from "react-google-recaptcha";

export const Login = () => {
  const captchaRef = useRef(null);
  const navigate = useNavigate();

  const Login = async (event) => {
    event.preventDefault();
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();

    api.captcha(token).then((res) => {
      if (res.data.success) {
        api.login(event).then((res) => {
          if (res && res.data.access_token) {
            navigate("/Loading", { replace: true });
          }
        });
      }
    });
  };

  return (
    <div className="login-form">
      <div className="form">
        <Form id="login-form" className="mb-3" onSubmit={Login}>
          <div className="input-container">
            <Form.Label>Email </Form.Label>
            <input type="email" name="email" required />
          </div>
          <div className="input-container">
            <Form.Label>Password </Form.Label>
            <input type="password" name="password" required />
          </div>
          <div>
            <ReCAPTCHA
              sitekey="6LfeJfAhAAAAAFYM59JLNsh0tzy_M3qdpapLTGU-"
              ref={captchaRef}
            />
            {/* {token} */}
          </div>
          <div className="button-container">
            <Button
              variant="outline-dark"
              style={{ color: "white", border: " 1px solid white" }}
              type="submit"
            >
              LOGIN
            </Button>
          </div>
          <div className="button-container">
            <Button
              variant="outline-dark"
              style={{ color: "white", border: " 1px solid white" }}
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
};
