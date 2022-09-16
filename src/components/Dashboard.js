import React, { useEffect } from "react";
import { Panel } from "./Panel";
import { AdminPanel } from "./AdminPanel";
import { Analytics } from "./Analytics";
import { Accordion} from "react-bootstrap";
import NavbarMain from "./Navbar";


export const Dashboard = () => {
  let dev = false;
  // useEffect(()=>{
  //   var pusher = new Pusher("952cfcc3e466664b7632", {
  //     cluster: "ap2",
  //   });
  //   Pusher.logToConsole = true;
  //   var channel = pusher.subscribe("my-channel-" /*+ res.payload.id*/);
  //   channel.bind("Task Assigned", function (data) {
  //     alert(JSON.stringify(data));
  //   });
  // },[]);

  return (
    <div>
       <NavbarMain />
      <div style={{ margin: "5px" }}>
        <Analytics />
        <Accordion defaultActiveKey="1">
          {/* //uncomment after paginator */}
          {!dev && <Accordion.Item eventKey="1">
            <Accordion.Header>Panel</Accordion.Header>
            <Accordion.Body>
              <Panel />
            </Accordion.Body>
          </Accordion.Item>}
          {dev && (
            <Accordion.Item eventKey="2">
              <Accordion.Header>Admin</Accordion.Header>
              <Accordion.Body>
                <AdminPanel />
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      </div>
    </div>
  );
};
