import { Link } from "react-router-dom";
import React from "react";

export const Home = () => {
  return (
    <div>
      <div className="home-container">
        <Link to="/Login">Login</Link> <Link to="/Register">Register</Link>
      </div>
    </div>
  );
};
