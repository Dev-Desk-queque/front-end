import { AxiosInstance } from "axios";
import { v4 as uuid } from "uuid";
import { iIssue } from "../reducer";

export enum types {
  SET_NETWORK_LOADING = "SET_NETWORK_LOADING",
  SET_USER_LOGOUT = "SET_USER_LOGOUT",
  SET_USER_TOKEN = "SET_USER_TOKEN",
  SET_ISSUES = "SET_ISSUES",
  SET_NETWORK_ERROR = "SET_NETWORK_ERROR",
}

const axiosError = new Error("An Axios instance must be sent as a parameter!");

export type iAction = {
  type: types;
  payload: any;
};

function returnAction(type: types, payload: any, dispatch?: Function) {
  const toReturn = {
    type,
    payload,
  };
  if (dispatch) {
    dispatch(toReturn);
  } else {
    return toReturn;
  }
}

export const logUserIn = (
  axios: AxiosInstance,
  username: string,
  password: string
) => (dispatch: Function) => {
  if (!axios) {
    throw axiosError;
  }
  returnAction(types.SET_NETWORK_LOADING, true, dispatch);
  axios
    .post("/api/devdesk/auth/login", { username, password })
    .then((res) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      returnAction(types.SET_NETWORK_ERROR, "", dispatch);
      returnAction(types.SET_USER_TOKEN, res.data.token, dispatch);
    })
    .catch((err) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      returnAction(types.SET_NETWORK_ERROR, err.message, dispatch);
    });
};

export const logUserOut = () => (dispatch: Function) => {
  returnAction(types.SET_USER_LOGOUT, null, dispatch);
  returnAction(types.SET_NETWORK_ERROR, "", dispatch);
};

export const registerUser = (options: {
  axios: AxiosInstance;
  username: string;
  password: string;
}) => (dispatch: Function) => {
  
  const { axios, username, password } = options;
  if (!axios) {
    throw axiosError;
  }
  returnAction(types.SET_NETWORK_LOADING, true, dispatch);
  axios
    .post("/api/devdesk/auth/register", { username, password })
    .then(() => {
      axios
        .post("/api/devdesk/auth/login", { username, password })
        .then((res) => {
          returnAction(types.SET_NETWORK_LOADING, false, dispatch);
          returnAction(types.SET_NETWORK_ERROR, "", dispatch);
          returnAction(types.SET_USER_TOKEN, res.data.token, dispatch);
        })
        .catch((err) => {
          returnAction(types.SET_NETWORK_LOADING, false, dispatch);
          returnAction(types.SET_NETWORK_ERROR, err.message, dispatch);
        });
    })
    .catch((err) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      returnAction(types.SET_NETWORK_ERROR, err.message, dispatch);
    });
};

export const getIssues = (axios: AxiosInstance) => (dispatch: Function) => {
  if (!axios) {
    throw axiosError;
  }
  returnAction(types.SET_NETWORK_LOADING, true, dispatch);
  axios
    .get("/api/devdesk/questions")
    .then((res) => {
      const issues = res.data.map((issue: iIssue) => {
        return { ...issue, key: uuid() };
      });
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      returnAction(types.SET_NETWORK_ERROR, "", dispatch);
      returnAction(types.SET_ISSUES, issues, dispatch);
    })
    .catch((err) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      returnAction(
        types.SET_NETWORK_ERROR,
        err.response || err.message,
        dispatch
      );
    });
};

export const submitNewIssue = (axios: AxiosInstance, issue: iAction) => (
  dispatch: Function
) => {
  if (!axios) {
    throw axiosError;
  }
  returnAction(types.SET_NETWORK_LOADING, true, dispatch);
  axios
    .post("/api/devdesk/questions", issue)
    .then((res) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      returnAction(types.SET_NETWORK_ERROR, "", dispatch);
    })
    .catch((err) => {
      console.log(err.response);
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      returnAction(types.SET_NETWORK_ERROR, err.message, dispatch);
    });
};
