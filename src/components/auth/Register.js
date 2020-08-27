import React from "react";
import useAxios from "../../hooks/useAxios";
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions";
import { useForm } from "react-hook-form";
import schema from "./formSchema";
import { yupResolver } from "@hookform/resolvers";

function Register() {
  const { axiosWithAuth: axios } = useAxios();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(
      registerUser({
        axios,
        username: data.username,
        password: data.password,
        is_helper: data.is_helper,
        is_student: data.is_student,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="error">{errors.username?.message}</p>
      <label htmlFor="userName">Username</label>
      <input
        type="text"
        name="username"
        placeholder="Enter username"
        ref={register}
      />

      <p className="error">{errors.password?.message}</p>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        ref={register}
      />

      <label htmlFor="student">Are you a student?</label>
      <div className="checkbox">
        <input type="checkbox" name="student" ref={register} />
        <span />
        <p>{errors.checkbox?.message}</p>
      </div>

      <label htmlFor="student">Are you a helper?</label>
      <div className="checkbox">
        <input type="checkbox" name="helper" ref={register} />
        <span />
        <p>{errors.checkbox?.message}</p>
      </div>

      <button name="button" type="submit">
        Create Account
      </button>
    </form>
  );
}

export default Register;
