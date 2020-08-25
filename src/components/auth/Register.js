import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";

const formSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, "Username must be at least 2 characters long")
    .required("Username is a required field"),
  password: yup.string(),
  student: yup.boolean().oneOf([false]),
  helper: yup.boolean().oneOf([false]),
});

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
    <form onSubmit={submitForm}>
      <label htmlFor="userName">Username</label>
      <input
        type="text"
        name="username"
        placeholder="Enter username"
        value={regFormState.username}
        onChange={handleChanges}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={regFormState.password}
        onChange={handleChanges}
      />
      <label htmlFor="student">Are you a student?</label>
      <div className="checkbox">
        <input
          type="checkbox"
          name="student"
          value={regFormState.student}
          onChange={handleChanges}
        />
        <span className={`${regFormState.student === true ? "checked" : ""}`} />
      </div>

      <label htmlFor="student">Are you a helper?</label>
      <div className="checkbox">
        <input
          type="checkbox"
          name="helper"
          value={regFormState.helper}
          onChange={handleChanges}
        />
        <span className={`${regFormState.helper === true ? "checked" : ""}`} />
      </div>

      <button name="button" type="submit">
        Create Account
      </button>
    </form>
  );
}

export default Register;
