export enum types {
  SET_NETWORK_LOADING,
  SET_USER_LOGIN,
  SET_USER_LOGOUT,
}

export type iAction = {
  type: types;
  payload: any;
};
