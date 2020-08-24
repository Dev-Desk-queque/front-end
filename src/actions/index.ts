import { AxiosInstance } from "axios";
import { questions } from "../dummyData";
import { BASE_URL } from "../utils/constants";

export enum types {
  SET_NETWORK_LOADING = "SET_NETWORK_LOADING",
  SET_USER_LOGIN = "SET_USER_LOGIN",
  SET_USER_LOGOUT = "SET_USER_LOGOUT",
  SET_USER_TOKEN = "SET_USER_TOKEN",
  SET_ISSUES = "SET_ISSUES",
}

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

export const logUserIn = (token: string) => (dispatch: Function) => {
  returnAction(types.SET_USER_TOKEN, token, dispatch);
};

export const logUserOut = () => (dispatch: Function) => {
  returnAction(types.SET_USER_LOGOUT, null, dispatch);
};

export const getIssues = (axios: AxiosInstance) => (dispatch: Function) => {
  returnAction(types.SET_NETWORK_LOADING, true, dispatch);
  setTimeout(() => {
    returnAction(types.SET_NETWORK_LOADING, false, dispatch);
    returnAction(types.SET_ISSUES, questions, dispatch);
  }, 1500);
};
