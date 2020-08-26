import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import StyledForm from '../styledForm';

export default function Auth() {
  const [loginShowing, setLoginShowing] = useState(true);

  const user = useSelector((state) => state.user);
  return (
    <React.Fragment>
      {user.token !== null ? (
        <Redirect to="/dashboard" />
      ) : (
        <StyledForm>
          <div className="header">
            <h2
              className={`button ${loginShowing && "active"}`}
              onClick={() => setLoginShowing(true)}
            >
              Login
            </h2>
            <h2
              className={`button ${loginShowing || "active"}`}
              onClick={() => setLoginShowing(false)}
            >
              Register
            </h2>
          </div>
          <section className="content">
            {loginShowing ? <Login /> : <Register />}
          </section>
        </StyledForm>
      )}
    </React.Fragment>
  );
}
