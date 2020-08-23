export enum types {
  SET_NETWORK_LOADING = "SET_NETWORK_LOADING",
  SET_USER_LOGIN = "SET_USER_LOGIN",
  SET_USER_LOGOUT = "SET_USER_LOGOUT",
  SET_USER_TOKEN = "SET_USER_TOKEN",
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
