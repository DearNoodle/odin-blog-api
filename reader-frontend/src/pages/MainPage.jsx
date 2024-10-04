import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIdContext } from "../App";

function MainPage() {
  const navigate = useNavigate();
  const userId = useContext(UserIdContext);

  useEffect(() => {
    if (userId) {
      navigate("/user");
      return;
    }
  }, []);
  return (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </>
  );
}

export default MainPage;
