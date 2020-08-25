import { AxiosInstance } from "axios";
import { v4 as uuid } from "uuid";
import { iIssue } from "../reducer";
import decode from "jwt-decode";
import { iSystemMessage } from "../reducer";

export enum types {
  SET_NETWORK_LOADING = "SET_NETWORK_LOADING",
  SET_USER_LOGOUT = "SET_USER_LOGOUT",
  SET_USER = "SET_USER",
  SET_ISSUES = "SET_ISSUES",
  ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE",
  REMOVE_MESSAGE = "REMOVE_MESSAGE",
}

export enum messageTypes {
  WARNING = "WARNING",
  ERROR = "ERROR",
  INFORMATION = "INFORMATION",
}

export type iAction = {
  type: types;
  payload: any;
};

const axiosError = new Error("An Axios instance must be sent as a parameter!");

/* Helper Functions */

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

function dispatchMessage(
  messageType: messageTypes,
  messageText: string,
  dispatch: Function
) {
  const message: iSystemMessage = {
    type: messageType,
    messageText,
    key: uuid(),
  };
  returnAction(types.ADD_NEW_MESSAGE, message, dispatch);
  setTimeout(() => {
    returnAction(types.REMOVE_MESSAGE, message, dispatch);
  }, 3500);
}

/* Action Dispatchers */

export const logUserIn = (options: {
  axios: AxiosInstance;
  username: string;
  password: string;
  callback?: Function;
}) => (dispatch: Function) => {
  const { axios, password, username, callback } = options;
  if (!axios) {
    throw axiosError;
  }
  returnAction(types.SET_NETWORK_LOADING, true, dispatch);
  axios
    .post("/api/devdesk/auth/login", { username, password })
    .then((res) => {
      const userObj = decode(res.data.token) as any;
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      returnAction(
        types.SET_USER,
        { token: res.data.token, username: userObj.username, id: userObj.subject },
        dispatch
      );
      dispatchMessage(
        messageTypes.INFORMATION,
        `Welcome, ${username}!`,
        dispatch
      );
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      dispatchMessage(
        messageTypes.ERROR,
        `${err.message}: ${err.response.data.message}`,
        dispatch
      );
    });
};

export const logUserOut = () => (dispatch: Function) => {
  returnAction(types.SET_USER_LOGOUT, null, dispatch);
};

export const registerUser = (options: {
  axios: AxiosInstance;
  username: string;
  password: string;
  callback?: Function;
}) => (dispatch: Function) => {
  const { axios, username, password, callback } = options;

  // No axios? No Enter
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
          const username = (decode(res.data.token) as any).username;
          returnAction(types.SET_NETWORK_LOADING, false, dispatch);
          returnAction(
            types.SET_USER,
            { token: res.data.token, username },
            dispatch
          );
          dispatchMessage(
            messageTypes.INFORMATION,
            `Welcome, ${username}!`,
            dispatch
          );
          if (callback) {
            callback();
          }
        })
        .catch((err) => {
          returnAction(types.SET_NETWORK_LOADING, false, dispatch);
          dispatchMessage(messageTypes.ERROR, err.message, dispatch);
        });
    })
    .catch((err) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      dispatchMessage(messageTypes.ERROR, err.message, dispatch);
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
      dispatchMessage(messageTypes.INFORMATION, "Loading Complete", dispatch);
      returnAction(types.SET_ISSUES, issues, dispatch);
    })
    .catch((err) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      dispatchMessage(messageTypes.ERROR, err.message, dispatch);
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
    .post("/api/devdesk/questions/1", issue)
    .then((res) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
    })
    .catch((err) => {
      console.log(err.response);
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      dispatchMessage(
        messageTypes.ERROR,
        `${err.message}: ${err.response.data.message}`,
        dispatch
      );
    });
};
