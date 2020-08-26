import { iAction, types, messageTypes } from "../actions";
import decode from "jwt-decode";

export type iAnswer = {};

export type iIssueFilter = {
  showAnswered: boolean;
  textSearch: string;
};

export type iIssue = {
  topic?: string;
  question?: string;
  id?: number;
  username?: string;
  is_resolved?: boolean;
  what_I_tried?: string | null;
  code_language?: string | null;
  question_user_id?: number;
  key?: string;
  answer?: iAnswer;
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
    id: null as null | number,
  };
  try {
    const token = JSON.parse(localStorage.getItem("token") as string);
    const obj = decode(token as string) as any;
    toReturn.token = token;
    toReturn.username = token && obj.username;
    toReturn.id = token && obj.subject;
  } catch (err) {}
  return toReturn;
};

const initialState = {
  isLoading: false,
  user: tryGetUser(),
  issues: [] as Array<iIssue>,
  isHelper: false,
  systemMessages: [] as Array<iSystemMessage>,
  issueFilter: { showAnswered: false, textSearch: "" } as iIssueFilter,
};

export type iState = typeof initialState;

export default function reducer(state = initialState, action: iAction): iState {
  switch (action.type) {
    case types.SET_NETWORK_LOADING:
      return { ...state, isLoading: action.payload as boolean };

    case types.SET_USER:
      try {
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      } finally {
        return { ...state, user: action.payload };
      }

    case types.SET_USER_LOGOUT:
      try {
        localStorage.removeItem("token");
      } finally {
        return { ...state, user: { username: null, token: null, id: null } };
      }

    case types.SET_ISSUES:
      return { ...state, issues: action.payload as Array<iIssue> };

    case types.SET_ISSUE_USER:
      return {
        ...state,
        issues: state.issues.map((issue: iIssue) => {
          let payload = action.payload as iIssue;
          if (issue.id === payload.id) {
            return payload;
          } else return issue;
        }),
      };

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

    case types.UPDATE_FILTER:
      return { ...state, issueFilter: action.payload as iIssueFilter };

    default:
      return state;
  }
}
