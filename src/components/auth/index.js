import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #2f2b4a;
  color: #ec3944;
  min-width: 40rem;
  margin-top: 10rem;
  border-radius: 2rem;
  box-shadow: 0.125rem 0.125rem 0.5rem 0rem black;
  .header {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    .button {
      &:first-child {
        border-top-left-radius: 2rem;
      }
      &:last-child {
        border-top-right-radius: 2rem;
      }
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ec3944;
      color: #2f2b4a;
      padding: 1rem;
      &:hover {
        background: #bb1333;
        color: black;
        cursor: pointer;
      }
      &.active {
        background: #2f2b4a;
        color: #ec3944;
        &:hover {
          background: #2f2b4a;
          color: #ec3944;
          cursor: default;
        }
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 10rem 0rem;
    form {
      display: grid;
      grid-template-columns: 20%, auto;
      grid-gap: 2rem;
      margin: 0rem 2rem;
      label,
      input,
      .checkbox {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      label {
        grid-column: 1 / 2;
        font-size: 1.5rem;
        flex-wrap: wrap;
      }
      input {
        grid-column: 2 / 3;
        height: 3rem;
        border-radius: .5rem;
        border: none;
        padding: 0rem 1rem;
      }
      .checkbox {
        grid-column: 2 / 3;
        position: relative;
        z-index: 0;
        input[type="checkbox"] {
          width: 2rem;
          height: 2rem;
          z-index: 1;
        }
        span {
          position: absolute;
          background: white;
          width: 2rem;
          height: 2rem;
          z-index: 0;
          border-radius: 0.25rem;
          &:hover {
            background: grey;
          }
          &.checked {
            background: black;
            content: ${"\u2713"};
          }
        }
      }
      button {
        grid-column: 1 / 3;
        margin: 0rem 2rem;
      }
    }
  }
`;

export default function Auth() {
  const [loginShowing, setLoginShowing] = useState(true);

  const user = useSelector((state) => state.user);
  return (
    <React.Fragment>
      {user.token !== null ? (
        <Redirect to="/dashboard" />
      ) : (
        <Container>
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
        </Container>
      )}
    </React.Fragment>
  );
}
