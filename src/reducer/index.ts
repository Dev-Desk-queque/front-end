import { iAction, types, messageTypes } from "../actions";
import decode from "jwt-decode";

export type iIssue = {
  topic?: string;
  question?: string;
  id?: number;
  is_resolved?: boolean;
  what_I_tried?: string | null;
  code_language?: string | null;
  question_user_id?: number;
  key?: string;
};

export type iSystemMessage = {
  type: messageTypes;
  messageText: string;
  key: string;
};

const tryGetUser = () => {
  let toReturn = {
    username: null as null | string,
    token: null as null | string,
  };
  try {
    const token = localStorage.getItem("token");
    toReturn.token = token;
    toReturn.username = token && (decode(token) as any).username;
  } catch (err) {}
  return toReturn;
};

const initialState = {
  isLoading: false,
  user: tryGetUser(),
  issues: [] as Array<iIssue>,
  isHelper: false,
  systemMessages: [] as Array<iSystemMessage>,
};

export type iState = typeof initialState;

export default function reducer(state = initialState, action: iAction): iState {
  switch (action.type) {
    case types.SET_NETWORK_LOADING:
      return { ...state, isLoading: action.payload as boolean };

    case types.SET_USER:
      try {
        localStorage.setItem("token", JSON.stringify(action.payload));
      } finally {
        return { ...state, user: action.payload };
      }

    case types.SET_USER_LOGOUT:
      try {
        localStorage.removeItem("token");
      } finally {
        return { ...state, user: { username: null, token: null } };
      }

    case types.SET_ISSUES:
      return { ...state, issues: action.payload as Array<iIssue> };

    case types.ADD_NEW_MESSAGE:
      return {
        ...state,
        systemMessages: [
          ...state.systemMessages,
          action.payload as iSystemMessage,
        ],
      };

    case types.REMOVE_MESSAGE:
      return {
        ...state,
        systemMessages: state.systemMessages.filter((message) => {
          let m = action.payload as iSystemMessage;
          if (message.key !== m.key) {
            return message;
          } else return null;
        }),
      };

    default:
      return state;
  }
}
