import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logUserIn, logUserOut } from "../actions";
import { BASE_URL } from "../utils/constants";

function useAxios() {
  let axiosWithAuth;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  if (token) {
    axiosWithAuth = axios.create({
      baseURL: BASE_URL,
      headers: { authorization: token },
    });
  } else {
    axiosWithAuth = axios.create({
      baseURL: BASE_URL,
      headers: {},
    });
  }

  function setToken(newToken, callback) {
    dispatch(logUserIn(newToken));
    axiosWithAuth = axios.create({
      baseURL: BASE_URL,
      headers: { authorization: newToken },
    });
    if (callback) {
      callback();
    }
  }

  function userLogOut(callback) {
    dispatch(logUserOut());
    axiosWithAuth = axios.create({
      baseURL: BASE_URL,
    });
    if (callback) {
      callback();
    }
  }

  return {
    axiosWithAuth,
    token,
    logUserIn: setToken,
    logUserOut: userLogOut,
  };
}

export default useAxios;
