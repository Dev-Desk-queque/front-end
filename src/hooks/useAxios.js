import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logUserIn, logUserOut } from "../actions";
import { BASE_URL } from "../utils/constants";

function useAxios() {
  let axiosWithAuth;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  if (token) {
    axiosWithAuth = axios.create({
      baseURL: BASE_URL,
      headers: { authorization: token, "Access-Control-Allow-Origin": "*" },
    });
  } else {
    axiosWithAuth = axios.create({
      baseURL: BASE_URL,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  function setToken(newToken) {
    dispatch(logUserIn(newToken));
    axiosWithAuth = axios.create({
      baseURL: BASE_URL,
      headers: { authorization: newToken, "Access-Control-Allow-Origin": "*" },
    });
  }

  function userLogOut() {
    dispatch(logUserOut());
    axiosWithAuth = axios.create({
      baseURL: BASE_URL,
      "Access-Control-Allow-Origin": "*",
    });
  }

  return {
    axiosWithAuth,
    token,
    logUserIn: setToken,
    logUserOut: userLogOut,
  };
}

export default useAxios;
