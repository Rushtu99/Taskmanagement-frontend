import React from "react";
import { Modal, Dropdown, NavDropdown } from "react-bootstrap";
import { toggleShowRole } from "../reducers/toastSlice";
import { setAllUsers } from "../reducers/allUsersSlice";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";

const AssignRoleModal = () => {
  let roles = [
    {
      id: 1,
      role: "ADMIN",
    },
    {
      id: 2,
      role: "USER",
    },
  ];
  let toast = useSelector((state) => state.toast);
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();

  let set = async (role_id, user) => {
    if (user.role !== role_id) {
      await api.changeRole(role_id, user.data.id);
      let res = await api.getAllUsers();
      dispatch(setAllUsers(res.data));
      handleClose();
    }
  };

  let handleClose = () => {
    dispatch(toggleShowRole());
  };

  let Bob = () => {
    if (toast.data.role == 1) {
      return <div>Current Role: ADMIN</div>;
    }
    if (toast.data.role == 2) {
      return <div>Current Role: USER</div>;
    }
  };
  return (
    <Modal
      show={toast.showRole}
      onHide={handleClose}
      backdrop="static"
      keyboard={true}
      centered={true}
      size="lg"
    >
      <Modal.Header closeButton>
        <strong className="me-auto">Assign Role to: {toast.data.name}</strong>
        <small> by: {user.data.name}</small>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", gap: "100px" }}>
          <Bob />
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              ChangeStatus
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {roles.map((role) => (
                <NavDropdown.Item
                  key={role.id}
                  onClick={() => {
                    set(role.id, toast);
                  }}
                >
                  {role.role}
                </NavDropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AssignRoleModal;
