import { iAction, types } from "../actions";

const tryGetToken = () => {
  let toReturn;
  try {
    const token = localStorage.getItem("token");
    toReturn = token;
  } catch (err) {
    const token = null;
    toReturn = token;
  }
  return toReturn;
};

const initialState = {
  isLoading: false,
  token: tryGetToken(),
  issues: [],
  isHelper: false
};

export type iState = typeof initialState;

export default function reducer(state = initialState, action: iAction): iState {
  switch (action.type) {
    case types.SET_NETWORK_LOADING:
      return { ...state, isLoading: action.payload as boolean };

    case types.SET_USER_TOKEN:
      try {
        localStorage.setItem("token", JSON.stringify(action.payload));
      } finally {
        return { ...state, token: action.payload as string };
      }

    case types.SET_USER_LOGOUT:
      try {
        localStorage.removeItem("token");
      } finally {
        return { ...state, token: null };
      }

    default:
      return state;
  }
}
