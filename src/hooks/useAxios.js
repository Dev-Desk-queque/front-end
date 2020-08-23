import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logUserIn, logUserOut } from "../actions";

function useAxios(baseURL) {
  let axiosWithAuth;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  if (token) {
    axiosWithAuth = axios.create({
      baseURL: baseURL,
      headers: { authorization: token },
    });
  } else {
    axiosWithAuth = axios.create({ baseURL: baseURL });
  }

  function setToken(newToken) {
    dispatch(logUserIn(newToken));
    axiosWithAuth = axios.create({
      baseURL: baseURL,
      headers: { authorization: newToken },
    });
  }

  function userLogOut() {
    dispatch(logUserOut());
  }

  return {
    axiosWithAuth,
    token,
    logUserIn: setToken,
    logUserOut: userLogOut,
  };
}

export default useAxios;
