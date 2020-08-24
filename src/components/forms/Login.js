<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "../dashboard/node_modules/styled-components";
import useAxios from '../../hooks/useAxios';

=======
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import styled from "styled-components";
import useAxios from "../../hooks/useAxios";
>>>>>>> test

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
  height: 50rem;
  width: 40rem;
  padding-top: 10rem;
  background: #2f2b4a;
  color: #ec3944;
  border-radius: 5%;
  box-shadow: 3px 4px 8px 0px rgba(0, 0, 0, 0.5);
  transition: 0.3s;
  font-size: 1.5rem;

  .links {
    a,
    .link {
      display: flex;
      justify-content: center;
      color: #ec3944;
      text-decoration: none;
      font-size: 2rem;
      cursor: pointer;
      border: thin solid #ec3944;
      padding: 0.25rem 0.5rem;
      margin: 0 12rem;
      border-radius: 0.5rem;
      transition: 0.125s ease-in-out all;
      &:hover {
        transition: 0.125s ease-in-out all;
        color: #2f2b4a;
        background: #ec3944;
        border: thin solid #ec3944;
      }
    }
  }
`;

const Label = styled.label`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 2%;
  padding-right: 8%;
  font-size: 1.8rem;
`;

const Input = styled.input`
  margin: 2%;
`;

function Login() {
  const { axiosWithAuth: axios } = useAxios();
  const { defaultForm, setDefaultForm } = {
    username: "",
    password: "",
  };
  const { formState, setFormState } = useState(defaultForm);

  const handleChanges = (event) => {
    console.log(event);
  };

  const submitForm = (event) => {
    console.log(event);
  };

  return (
    <div>
      <Container>
        <h1>Login</h1>
        <form>
          <Label htmlFor="userName">
            Username
            <Input
              type="text"
              name="username"
              placehokder="Enter username"
              // value={formState.username}
              // onChange={}
            ></Input>
          </Label>
          <br />
          <Label htmlFor="password">
            Password
            <Input
              type="password"
              name="password"
              placehokder="Enter password"
              // value={formState.password}
              // onChange={}
            ></Input>
          </Label>
          <div className="links">
            <NavLink to="/login">Login</NavLink>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default Login;
