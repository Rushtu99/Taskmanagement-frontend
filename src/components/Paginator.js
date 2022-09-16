import React from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../reducers/paginatorSlice";
import { getAllTasks } from "../reducers/allTasksSlice";
import { getTasks } from "../reducers/taskSlice";
import { getAllUsers } from "../reducers/allUsersSlice";
const Paginator = (props) => {
  let dispatch = useDispatch();

  const paginator = useSelector((state) => state.paginator);
  return (
    <div>
      <div className="paginator">
        <Button
          variant="dark"
          onClick={()=>{
            if (props.type == "admin") {
              dispatch(getAllTasks(paginator.page - 1)).then((res) => {
                dispatch(setPage(paginator.page - 1));
              });
            }
            if (props.type == "task") {
              dispatch(getTasks(paginator.page - 1)).then((res) => {
                dispatch(setPage(paginator.page - 1));
              });
            }
            if (props.type == "user") {
              dispatch(getAllUsers(paginator.page - 1)).then((res) => {
                dispatch(setPage(paginator.page - 1));
              });
            }
          }
        }
          disabled={paginator.page == 1}
        >
          Previous
        </Button>
        {paginator.page}
        <Button
          variant="dark"
          onClick={() => {
            if (props.type == "admin") {
              dispatch(getAllTasks(paginator.page + 1)).then((res) => {
                dispatch(setPage(paginator.page + 1));
              });
            }
            if (props.type == "task") {
              dispatch(getTasks(paginator.page + 1)).then((res) => {
                dispatch(setPage(paginator.page + 1));
              });
            }
            if (props.type == "user") {
              console.log(paginator.page + 1);
              dispatch(getAllUsers(paginator.page + 1)).then((res) => {
                dispatch(setPage(paginator.page + 1));
              });
            }
          }}
          disabled={paginator.page >= props.last}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Paginator;
