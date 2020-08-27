import { AxiosInstance, AxiosPromise } from "axios";
import { v4 as uuid } from "uuid";
import { iIssue, iIssueFilter, iState, iAnswer } from "../reducer";
import decode from "jwt-decode";
import { iSystemMessage } from "../reducer";
import { dummyData } from "../utils/dummyData";

export enum types {
  SET_NETWORK_LOADING = "SET_NETWORK_LOADING",
  SET_USER_LOGOUT = "SET_USER_LOGOUT",
  SET_USER = "SET_USER",
  SET_ISSUES = "SET_ISSUES",
  SET_ISSUE_TO_EDIT = "SET_ISSUE_TO_EDIT",
  REMOVE_ISSUE_TO_EDIT = "REMOVE_ISSUE_TO_EDIT",
  SET_ISSUE_ANSWERS = "SET_ISSUE_ANSWERS",
  SET_ISSUE_USER = "SET_ISSUE_USER",
  ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE",
  REMOVE_MESSAGE = "REMOVE_MESSAGE",
  UPDATE_FILTER = "UPDATE_FILTER",
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
  }, 4000);
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
        {
          token: res.data.token,
          username: userObj.username,
          id: userObj.subject,
        },
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
        `${err.message}: ${err.response && err.response.data.message}`,
        dispatch
      );
    });
};

export const logUserOut = () => (dispatch: Function) => {
  returnAction(types.SET_USER_LOGOUT, null, dispatch);
  returnAction(types.SET_ISSUES, [], dispatch);
};

export const registerUser = (options: {
  axios: AxiosInstance;
  username: string;
  password: string;
  is_helper: boolean;
  is_student: boolean;
  callback?: Function;
}) => (dispatch: Function) => {
  const {
    axios,
    username,
    password,
    is_helper,
    is_student,
    callback,
  } = options;

  // No axios? No Enter
  if (!axios) {
    throw axiosError;
  }

  returnAction(types.SET_NETWORK_LOADING, true, dispatch);
  axios
    .post("/api/devdesk/auth/register", {
      username,
      password,
      is_helper,
      is_student,
    })
    .then(() => {
      axios
        .post("/api/devdesk/auth/login", { username, password })
        .then((res) => {
          const decoded = decode(res.data.token) as any;
          returnAction(types.SET_NETWORK_LOADING, false, dispatch);
          returnAction(
            types.SET_USER,
            {
              token: res.data.token,
              username: decoded.username,
              id: decoded.subject,
            },
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

export const getIssues = (axios: AxiosInstance, callback?: Function) => (
  dispatch: Function
) => {
  if (!axios) {
    throw axiosError;
  }
  returnAction(types.SET_NETWORK_LOADING, true, dispatch);
  axios
    .get("/api/devdesk/questions")
    .then((res) => {
      const issues = res.data
        .filter((issue: iIssue) => {
          if (issue.topic !== null && issue.question !== null) {
            return issue;
          } else return null;
        })
        .map((issue: iIssue) => {
          return { ...issue, key: uuid() };
        });
      dispatch(getIssueUsers({ axios, issues, callback }));
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
    })
    .catch((err) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      dispatchMessage(messageTypes.ERROR, err.message, dispatch);
      returnAction(types.SET_ISSUES, dummyData, dispatch);
    });
};

export const submitNewIssue = (options: {
  axios: AxiosInstance;
  issue: iIssue;
  callback?: Function;
}) => (dispatch: Function, getState: Function) => {
  const { axios, issue, callback } = options;

  if (!axios) {
    throw axiosError;
  }
  const { user } = getState();
  returnAction(types.SET_NETWORK_LOADING, true, dispatch);
  const newIssue: iIssue = {
    ...issue,
    question_user_id: user.id,
  };
  axios
    .post("/api/devdesk/protected/questions", newIssue)
    .then((res) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      dispatchMessage(
        messageTypes.INFORMATION,
        "Question created successfully",
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
        `${err.message}: ${err.response && err.response.data.message}`,
        dispatch
      );
    });
};

export const deleteIssue = (options: {
  axios: AxiosInstance;
  issue: iIssue;
  callback?: Function;
}) => (dispatch: Function) => {
  const { axios, issue, callback } = options;
  if (!axios) {
    throw axiosError;
  }
  returnAction(types.SET_NETWORK_LOADING, true, dispatch);
  axios
    .delete(`/api/devdesk/protected/question/${issue.id}`)
    .then((res) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      dispatchMessage(messageTypes.INFORMATION, "Question deleted", dispatch);
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      dispatchMessage(
        messageTypes.ERROR,
        `${err.message} ${
          err.response && err.response.message && err.response.message
        }`,
        dispatch
      );
    });
};

const getIssueUsers = (options: {
  axios: AxiosInstance;
  issues: Array<iIssue>;
  callback?: Function;
}) => (dispatch: Function) => {
  const { axios, issues, callback } = options;
  if (!axios) {
    throw axiosError;
  }
  const promises = [] as Array<AxiosPromise>;
  const issuesToSend = [] as Array<iIssue>;
  issues.forEach((issue) => {
    promises.push(
      axios.get(`/api/devdesk/protected/user/${issue.question_user_id}`)
    );
  });
  Promise.all(promises).then((arr) => {
    arr.forEach((res, index) => {
      issuesToSend.push({ ...issues[index], username: res.data[0].username });
    });
    dispatch(getIssueAnswers({ axios, issues: issuesToSend, callback }));
    if (callback) {
      callback();
    }
  });
};

export const getIssueAnswers = (options: {
  axios: AxiosInstance;
  issues: iIssue[];
  callback?: Function;
}) => (dispatch: Function, getState: () => iState) => {
  const { axios, issues } = options;

  if (!axios) {
    throw axiosError;
  }

  const issuesToSend = [] as Array<iIssue>;

  const promises = [] as Array<AxiosPromise>;

  issues.forEach((issue) => {
    promises.push(axios.get(`/api/devdesk/question/${issue.id}/answer`));
  });

  Promise.all(promises).then((prom) => {
    prom.forEach((res, index) => {
      issuesToSend.push({ ...issues[index], answers: res.data });
    });
    returnAction(types.SET_ISSUES, issuesToSend, dispatch);
  });
};

export const sendEditedIssue = (options: {
  axios: AxiosInstance;
  issue: iIssue;
  callback?: Function;
}) => (dispatch: Function) => {
  const { axios, issue, callback } = options;
  if (!axios) throw axiosError;
  const {
    is_resolved,
    question,
    topic,
    what_I_tried,
    question_user_id,
    code_language,
  } = issue;
  const toSend = {
    is_resolved,
    question,
    topic,
    what_I_tried,
    question_user_id,
    code_language,
  };

  returnAction(types.SET_NETWORK_LOADING, true, dispatch);
  axios
    .put(`/api/devdesk/protected/question/${issue.id}`, toSend)
    .then((res) => {
      dispatch(getIssues(axios, callback));
    })
    .catch((err) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      dispatchMessage(messageTypes.ERROR, err.message, dispatch);
    });
};

export const sendAnswer = (options: {
  axios: AxiosInstance;
  answer: iAnswer;
  issue: iIssue;
  callback?: Function;
}) => (dispatch: Function) => {
  const { axios, issue, answer, callback } = options;
  if (!axios) throw axiosError;

  returnAction(types.SET_NETWORK_LOADING, true, dispatch);

  axios
    .post(`/api/devdesk/protected/question/${issue.id}/answer`, answer)
    .then(() => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      dispatchMessage(messageTypes.INFORMATION, "Answer Submitted", dispatch);
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      dispatchMessage(messageTypes.ERROR, err.message, dispatch);
    });
};

export const deleteAnswer = (options: {
  axios: AxiosInstance;
  answer: iAnswer;
  callback?: Function;
}) => (dispatch: Function) => {
  const { axios, answer, callback } = options;
  if (!axios) throw axiosError;
  returnAction(types.SET_NETWORK_LOADING, true, dispatch);
  axios
    .delete(`/api/devdesk/protected/question/${answer.id}/answer`)
    .then(() => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      dispatchMessage(messageTypes.INFORMATION, "Answer Deleted", dispatch);
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      dispatchMessage(messageTypes.ERROR, err.message, dispatch);
    });
};

/* UX ACTIONS */

export const updateFilter = (filter: iIssueFilter) => (dispatch: Function) => {
  returnAction(types.UPDATE_FILTER, filter, dispatch);
};

export const editIssue = (options: { issue: iIssue; callback?: Function }) => (
  dispatch: Function
) => {
  const { issue, callback } = options;
  returnAction(types.SET_ISSUE_TO_EDIT, issue, dispatch);
  if (callback) {
    callback();
  }
};

export const clearEditIssue = (options: { callback?: Function }) => (
  dispatch: Function
) => {
  const { callback } = options;
  returnAction(types.REMOVE_ISSUE_TO_EDIT, null, dispatch);
  if (callback) {
    callback();
  }
};
