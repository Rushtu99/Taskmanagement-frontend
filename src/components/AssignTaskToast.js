import React from "react";
import { Form, Button, Toast, ToastContainer } from "react-bootstrap";
import { setData, removeData, toggleShow } from "../reducers/toastSlice";
import { useSelector, useDispatch } from "react-redux";

const AssignTaskToast = () => {
  let toast = useSelector((state) => state.toast);
  let dispatch = useDispatch();

    let handleSubmit=()=>{
        console.log("bob")
    }

  return (
    <ToastContainer position="middle-center">
      <Toast onClose={() => dispatch(toggleShow())} show={toast.show}>
        <Toast.Header>
          <strong className="me-auto">Assign Task to:</strong>
          <small>{toast.data.name}</small>
        </Toast.Header>
        <Toast.Body>
          <Form id="login-form" class="mb-2" onSubmit={handleSubmit}>
            <div className="input-container">
              <Form.Label>Title </Form.Label>
              <input name="title" required />
            </div>
            <div className="input-container">
              <Form.Label>Description </Form.Label>
              <input name="Desc" required />
            </div>
            <div className="input-container">
              <Form.Label>Due Date </Form.Label>
              <input  name="password" required />
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
                onClick={() => {}}
              >
                Dont have account?
              </Button>
            </div>
          </Form>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default AssignTaskToast;
