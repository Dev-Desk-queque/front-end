import { iAction, types } from "../actions";

export type iIssue = {
  topic?: string;
  question?: string;
  id?: number;
  is_resolved?: boolean;
  what_I_tried?: string | null;
  code_language?: string | null;
  question_user_id?: number;
  key?: string
};

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
  issues: [] as Array<iIssue>,
  isHelper: false,
  networkError: "",
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

    case types.SET_ISSUES:
      return { ...state, issues: action.payload as Array<iIssue> };

    case types.SET_NETWORK_ERROR:
      return {...state, networkError: action.payload};

    default:
      return state;
  }
}
