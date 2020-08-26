import React from "react";
import { useHistory } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useDispatch } from "react-redux";
import { logUserIn } from "../../actions";
import { yupResolver } from "@hookform/resolvers";
import { useForm } from "react-hook-form";
import schema from "./formSchema";

function Login() {
  const { axiosWithAuth: axios } = useAxios();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const { push } = useHistory();

  const onSubmit = (data) => {
    console.log("hello");
    dispatch(
      logUserIn({
        axios,
        username: data.username,
        password: data.password,
        callback: () => {
          push("/dashboard");
        },
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="userName">
        Username
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          ref={register({ required: true, max: 20, min: 3 })}
        />
        <p>{errors.username?.message}</p>
      </label>

      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          ref={register}
        />
        <p>{errors.password?.message}</p>
      </label>
      <button type="submit" className="link">
        Login
      </button>
    </form>
  );
}

export default Login;
