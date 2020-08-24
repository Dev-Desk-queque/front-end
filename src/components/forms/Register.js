import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import styled from "styled-components";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import { validate } from "uuid";

const formSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, "Username must be at least 2 characters long")
    .required("Username is a required field"),
  password: yup.string(),
  student: yup.boolean().oneOf([false]),
  helper: yup.boolean().oneOf([false]),
});

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
    button,
    .link {
      font-family: inherit;
      display: flex;
      justify-content: center;
      color: #ec3944;
      background: none;
      font-size: 2rem;
      cursor: pointer;
      border: thin solid #ec3944;
      padding: 0.3rem 0.7rem;
      margin: 0 14rem;
      margin-top: 5%;
      border-radius: 0.5rem;
      transition: 0.125s ease-in-out all;
      text-decoration: none;
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
  justify-content: center;
  align-items: center;
  padding: 2%;
  padding-right: 8%;
  font-size: 1.8rem;
`;

const Input = styled.input`
  margin: 2%;
`;

function Register() {
  const { axiosWithAuth: axios } = useAxios();
  const [defaultRegForm, setDefaultRegForm] = useState({
    username: "",
    password: "",
    student: "false",
    helper: "false",
  });
  const [regFormState, setRegFormState] = useState(defaultRegForm);
  const [errorState, setErrorState] = useState(defaultRegForm);

  //   const validation = (event) => {
  //     yup
  //       .reach(formSchema, event.target.name)
  //       .validate(event.target.value)
  //       .then((valid) => {
  //         setErrorState({
  //           ...errorState,
  //           [event.target.name]: "",
  //         });
  //       });
  //   .catch((error) => {
  //     console.log(error.errors);
  //     setErrorState({
  //       ...errorState,
  //       [event.target.name]: error.errors[0],
  //     });
  //   });
  //  };

  const handleChanges = (event) => {
    // event.persist();
    // validation(event);
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setRegFormState({
      ...regFormState,
      [event.target.name]: value,
      id: Date.now(),
    });
    console.log("input changed!", value);
  };

  const submitForm = (event) => {
    console.log("form submitted!");
  };

  return (
    <div>
      <Container>
        <h1>Register</h1>
        <form onSubmit={submitForm}>
          <Label htmlFor="userName">
            Username
            <Input
              type="text"
              name="username"
              placehokder="Enter username"
              value={regFormState.username}
              onChange={handleChanges}
            ></Input>
          </Label>
          <br />
          <Label htmlFor="password">
            Password
            <Input
              type="password"
              name="password"
              placehokder="Enter password"
              value={regFormState.password}
              onChange={handleChanges}
            ></Input>
          </Label>
          <br />
          <Label htmlFor="student">
            Are you a student?
            <Input
              type="checkbox"
              name="student"
              value={regFormState.student}
              onChange={handleChanges}
            ></Input>
          </Label>
          <br />
          <Label htmlFor="student">
            Are you a helper?
            <Input
              type="checkbox"
              name="helper"
              value={regFormState.helper}
              onChange={handleChanges}
            ></Input>
          </Label>
          <div className="links">
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              <button name="button" type="submit">
                Create Account
              </button>
            </NavLink>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default Register;
