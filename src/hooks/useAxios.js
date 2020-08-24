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
      headers: { authorization: token },
    });
  } else {
    axiosWithAuth = axios.create({ baseURL: BASE_URL });
  }

  function setToken(newToken) {
    dispatch(logUserIn(newToken));
    axiosWithAuth = axios.create({
      baseURL: BASE_URL,
      headers: { authorization: newToken },
    });
  }

  function userLogOut() {
    dispatch(logUserOut());
    axiosWithAuth = axios.create({ baseURL: BASE_URL });
  }

  return {
    axiosWithAuth,
    token,
    logUserIn: setToken,
    logUserOut: userLogOut,
  };
}

export default useAxios;
