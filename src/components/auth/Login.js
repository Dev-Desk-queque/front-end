import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useAxios from "../../hooks/useAxios";
import useForm from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { logUserIn } from "../../actions";

function Login() {
  const { axiosWithAuth: axios } = useAxios();
  const dispatch = useDispatch();
  const defaultForm = {
    username: "",
    password: "",
  };
  const [formValues, handleChanges] = useForm(defaultForm);
  const { push } = useHistory();

  const submitForm = (event) => {
    event.preventDefault();
    console.log(event);
    dispatch(
      logUserIn({
        axios,
        username: formValues.username,
        password: formValues.password,
        callback: () => {
          push("/dashboard");
        },
      })
    );
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="userName">Username</label>
      <input
        type="text"
        name="username"
        placeholder="Enter username"
        value={formValues.username}
        onChange={handleChanges}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={formValues.password}
        onChange={handleChanges}
      />
      <button type="submit" className="link">
        Login
      </button>
    </form>
  );
}

export default Login;
