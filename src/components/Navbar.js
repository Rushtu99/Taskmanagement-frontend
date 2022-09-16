import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Container, Navbar, Nav, Offcanvas } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, getUser, setAdmin } from "../reducers/userSlice";
import { setSearch } from "../reducers/searchSlice";
import { getTasks, removeTasks } from "../reducers/taskSlice";
import { removeAllUsers, getAllUsers } from "../reducers/allUsersSlice";
import { getAllTasks } from "../reducers/allTasksSlice";
import { setPage } from "../reducers/paginatorSlice";
import { toggleShow } from "../reducers/notifSlice";
import Notifications from "./Notifications";
import { getNotifs } from "../reducers/notifSlice";
import api from "../services/api";
import Pusher from "pusher-js";
import { Link } from "react-router-dom";
import _ from "lodash";

const NavbarMain = () => {
  const search = useSelector((state) => state.search);
  const paginator = useSelector((state) => state.paginator);
  const user = useSelector((state) => state.user);
  const notif = useSelector((state) => state.notif);
  const [showData, setShowData] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogOut = async () => {
    try {
      await api.logout();
      localStorage.removeItem("user");
      dispatch(setAdmin(false));
      dispatch(removeUser());
      dispatch(removeTasks());
      dispatch(removeAllUsers());

      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    init();
  }, []);

  let debouncedGet = useCallback(
    _.debounce(() => {
      dispatch(getTasks(1));
      dispatch(getAllUsers(1));
      dispatch(getAllTasks(1));
      dispatch(setPage(1));
    }, 500),
    []
  );

  async function init() {
    console.log("init-navbar");
    // var pusher = new Pusher("952cfcc3e466664b7632", {
    //   cluster: "ap2",
    // });
    // Pusher.logToConsole = true;

    await dispatch(getUser()).then((res) => {
      if (res.type == "user/getUser/rejected") {
        navigate("/Login", { replace: true });
      }
      // let channel = pusher.subscribe("my-channel-" + res.payload.id);
      // channel.bind("Task Assigned", function (data) {
      //   alert(JSON.stringify(data));
      // });

      if (res.payload.role == 1) {
        dispatch(getAllTasks(paginator.page));
      }
    });
    await dispatch(getNotifs()).then(()=>{
      console.log("true");
      setShowData(true);
    })
    await dispatch(getTasks(paginator.page));
    await dispatch(getAllUsers(paginator.page));
  }

  let handleSearch = (e) => {
    console.log("handleSearch-navbar");
    dispatch(setSearch(e.target.value));
    dispatch(setPage(1));
    debouncedGet();
  };

  let handleClose = () => {
    dispatch(toggleShow());
    console.log("closed");
  };

  return (
    <>
      <Offcanvas show={notif.showCanvas} placement="end" onHide={handleClose}>
        <Offcanvas.Header
          style={{
            backgroundColor: "rgb(33,37,41)",
            color: "white",
            marginTop: "21px",
            marginBottom:"21px"
          }}
          closeButton
        >
          <Offcanvas.Title>
            <h4>Notifications</h4>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{padding:"0px"}}>
         <Notifications/>
        </Offcanvas.Body>
      </Offcanvas>
      <Navbar
        bg="dark"
        sticky="top"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Container style={{ color: "white", display: "flex" }}>
          <h1>Dashboard</h1>
          <Nav>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/dashboard/profile"
            >
              Profile&nbsp;&nbsp;&nbsp;&nbsp;
            </Link>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/dashboard/tasks"
            >
              Tasks&nbsp;&nbsp;&nbsp;&nbsp;
            </Link>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/dashboard/users"
            >
              Users&nbsp;&nbsp;&nbsp;&nbsp;
            </Link>
            {user.admin && (
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/dashboard/admin"
              >
                Admin&nbsp;&nbsp;&nbsp;&nbsp;
              </Link>
            )}
          </Nav>
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              placeholder="Search..."
              value={search.data}
              onChange={(e) => handleSearch(e)}
            />
          </label>
          <div className="button-nav">
            <div className="container-notif">
              <Button
                className="button-notif"
                variant="dark"
                onClick={() => {
                  dispatch(toggleShow());
                }}
              >
                {" "}
                Notifications
              </Button>
              {showData && <span className="bubble-notif">{notif.data.total}</span>}
            </div>
            <Button variant="dark" onClick={init}>
              {" "}
              Init
            </Button>
            <Button variant="dark" onClick={LogOut}>
              {" "}
              Log Out
            </Button>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarMain;
