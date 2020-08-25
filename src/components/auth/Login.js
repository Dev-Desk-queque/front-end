import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useAxios from "../../hooks/useAxios";
import useForm from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { logUserIn } from "../../actions";

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
    <div>
      <Container>
        <h1>Login</h1>
        <form onSubmit={submitForm}>
          <Label htmlFor="userName">
            Username
            <Input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formValues.username}
              onChange={handleChanges}
            ></Input>
          </Label>
          <br />
          <Label htmlFor="password">
            Password
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formValues.password}
              onChange={handleChanges}
            ></Input>
          </Label>
          <div className="links">
            <button type="submit" className="link">
              Login
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default Login;
