import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(2, "Username must be at least 2 characters long")
    .required("Username is a required field"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is a required field"),
  student: yup.boolean().oneOf([false]),
  helper: yup.boolean().oneOf([false]),
});

export default schema;
