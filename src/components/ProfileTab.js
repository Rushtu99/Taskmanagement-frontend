import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Offcanvas } from "react-bootstrap";
import api from "../services/api";
import NavbarMain from "./Navbar";
import { Analytics } from "./Analytics";
import taskSlice from "../reducers/taskSlice";
import { toggleShow } from "../reducers/notifSlice";
import moment from "moment";

export const ProfileTab = () => {
  let dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  let task = useSelector((state) => state.task);
  let notif = useSelector((state) => state.notif);
  let check;
  const [show, setShow] = useState(true);
  let verifyEmail = async () => {
    await api.verifyEmailReq();
  };

  let resetPassword = async () => {
    await api.resetPasswordReq(user.data.email);
  };

  if (user.data.email_verified_at) {
    check = (
      <div className="float">
        <div>Email verified at: </div>
        <div className="item2">
          {" "}
          {moment(moment.utc(user.data.email_verified_at).toDate()).format(
            "YYYY-MM-DD"
          )}
        </div>
      </div>
    );
  } else {
    check = (
      <Button
        variant="outline-dark"
        style={{
          border: " 1px solid white",
          margin: "10px",
          marginLeft: "auto",
          marginTop: "100px",
        }}
        onClick={verifyEmail}
      >
        Verify Email address
      </Button>
    );
  }

  return (
    <div>
      <NavbarMain />
      <div className="container-custom">
        <h2>Profile</h2>
        <Card>
          <div className="float">
            <div className="item"> UserID:</div>
            <div className="item2">{user.data.id}</div>
          </div>
          <div className="float">
            <div className="item">Name: </div>
            <div className="item2">{user.data.name}</div>
          </div>
          <div className="float">
            <div className="item">Email: </div>
            <div className="item2">{user.data.email}</div>
          </div>
          <div className="float">
            <div className="item">Account created at: </div>
            <div className="item2">
              {" "}
              {moment(moment.utc(user.data.created_at).toDate()).format(
                "YYYY-MM-DD"
              )}
            </div>
          </div>
          {check}
          <Button
            variant="outline-dark"
            style={{
              border: " 1px solid white",
              margin: "10px",
              marginLeft: "auto",
              marginTop: "100px",
            }}
            onClick={resetPassword}
          >
            Reset your Password
          </Button>
        </Card>
        {task.status == "fulfilled" ? <Analytics /> : <h1>Loading....</h1>}
      </div>
    </div>
  );
};
