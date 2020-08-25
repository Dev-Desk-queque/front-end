import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import schema from "./formSchema";
import { yupResolver } from "@hookform/resolvers";

function Register() {
  const { axiosWithAuth: axios } = useAxios();
  const { push: reroute } = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="userName">Username</label>
      <input type="text" name="username" placeholder="Enter username" />
      <p>{errors.username?.message}</p>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" placeholder="Enter password" />
      <p>{errors.password?.message}</p>
      <label htmlFor="student">Are you a student?</label>
      <div className="checkbox">
        <input type="checkbox" name="student" />
        <p>{errors.checkbox?.message}</p>
      </div>

      <label htmlFor="student">Are you a helper?</label>
      <div className="checkbox">
        <input type="checkbox" name="helper" />
        <p>{errors.checkbox?.message}</p>
      </div>

      <button name="button" type="submit">
        Create Account
      </button>
    </form>
  );
}

export default Register;
