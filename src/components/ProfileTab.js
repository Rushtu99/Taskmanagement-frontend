import { useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import api from "../services/api";
export const ProfileTab = () => {
  let user = useSelector((state) => state.user);

  let check;

  let verifyEmail = async () => {
    await api.verifyEmailReq();
  };

  let resetPassword = async () => {
    await api.resetPasswordReq(user.data.email);
  };

  if (user.data.email_verified_at) {
    check = (
      <div className="float">
        <div>Email_verified: </div>
        <div className="item2">{user.data.email_verified_at}</div>
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
        <div className="item">created_at: </div>
        <div className="item2">{user.data.created_at}</div>
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
  );
};
