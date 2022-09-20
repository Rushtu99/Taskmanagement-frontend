import { map } from "highcharts";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { getNotifs } from "../reducers/notifSlice";
import api from "../services/api";
const Notifications = () => {
  let dispatch = useDispatch();
  const [showData, setShowData] = useState(false);
  useEffect(() => {
    dispatch(getNotifs()).then((res) => {
      setShowData(true);
    });
  }, []);
  let handleClick = (id) => {
    api.setSeen(id).then((res) => {
      dispatch(getNotifs());
    });
  };
  let notif = useSelector((state) => state.notif);
  return (
    <div>
      {showData &&
        notif.data.data.map((notif) => (
          <Card
            style={{
              marginBottom: "6px",
              marginLeft: "2px",
              marginRight: "2px",
              border: "1px solid black",
              borderRadius:"5px",
              backgroundColor: "red",
              fontSize: "14px",
            }}
          >
            <Card.Header
              style={{
                padding: "6px",
                backgroundColor: "rgb(250, 255, 158)",
                display: "flex",
              }}
            >
              <div>{notif.message}</div>
              <div style={{ marginLeft: "auto" }}>
                <Button
                  style={{
                    paddingTop: "0px",
                    paddingBottom: "2px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                  }}
                  variant="outline-danger"
                  onClick={() => {
                    handleClick(notif.id);
                  }}
                >
                  &times;
                </Button>
              </div>
            </Card.Header>
            <Card.Body
              style={{ padding: "6px", backgroundColor: "rgb(255, 248, 237)" }}
            >
              {notif.description}
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default Notifications;
