import React from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { toggleShowTask } from "../reducers/toastSlice";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";
// import moment from "moment";
import { getTasks } from "../reducers/taskSlice";

const AssignTaskModal = () => {
  let toast = useSelector((state) => state.toast);
  let user = useSelector((state) => state.user)
  let dispatch = useDispatch();

    // let print = (e)=>{
    //   e.preventDefault();
    //   let  t = moment(e.target[1].value).utc().format("YYYY-MM-DD HH:mm:ss");
    // }

    let handleSubmit= async(event,to)=>{
      event.preventDefault();
      event.currentTarget.disabled = true;
      let t = event.target[0].value;
      let dd = event.target[1].value;
      let d = event.target[2].value;
      let res = await api.createTask(t,dd,d,to);
      dispatch(getTasks());
      if(res.data.title){
        handleClose();
      }
      event.currentTarget.disabled = false;
    }

    let handleClose=()=>{
      dispatch(toggleShowTask())
    }

  return (
      <Modal show={toast.showTask}
      onHide={handleClose}
      backdrop="static"
      keyboard={true}
      centered={true}
      size="lg">
        <Modal.Header closeButton>
          <strong className="me-auto">Assign Task to: {toast.data.name}</strong>
          <small> by: {user.data.name}</small>
        </Modal.Header>
        <Modal.Body>
          <Form id="login-form" className="mb-2" onSubmit={(event)=>{
            handleSubmit(event,toast.data.id)
            //print(event);
          }}>
            <div className="modal-container">
              <Form.Label>Title </Form.Label>
              <input name="title" required />
              <Form.Label>Due Date </Form.Label>
              <input type="datetime-local" name="password" required />
            </div>
            <div className="modal-container">
              <Form.Label>Description </Form.Label>
              <textarea type="text" name="Desc" cols={75} rows={3} required />
            </div>
            <div className="input-container">
              
            </div>
            <div className="modal-button-container">
              <Button
                variant="outline-dark"
                style={{ color: "white", border: " 1px solid white" }}
                type="submit"
                disabled={false}
              >
                Assign
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
  );
};

export default AssignTaskModal;
