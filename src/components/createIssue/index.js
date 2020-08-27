import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { submitNewIssue, getIssues, sendEditedIssue, clearEditIssue } from "../../actions";
import useAxios from "../../hooks/useAxios";
import StyledForm from "../styledForm";
import useForm from "../../hooks/useForm";
import { PROGRAMMING_LANGUAGES } from "../../utils/constants";
import { v4 as uuid } from "uuid";

const initialFormValues = {
  topic: "",
  question: "",
  what_I_tried: "",
  code_language: "NONE",
};

export default function CreateIssue(props) {
  const issueToEdit = useSelector((state) => state.issueToEdit);
  const [formValues, onFormChange] = useForm(issueToEdit || initialFormValues);
  const { push: reroute } = useHistory();

  const dispatch = useDispatch();
  const { axiosWithAuth: axios } = useAxios();

  function handleSubmit(e) {
    e.preventDefault();
    if (issueToEdit) {
      dispatch(
        sendEditedIssue({
          axios,
          issue: formValues,
          callback: () => {
            reroute("/dashboard");
            dispatch(getIssues(axios));
            dispatch(clearEditIssue({}));
          },
        })
      );
    } else {
      dispatch(
        submitNewIssue({
          axios,
          issue: formValues,
          callback: () => {
            reroute("/dashboard");
            dispatch(getIssues(axios));
          },
        })
      );
    }
  }

  return (
    <StyledForm>
      <div className="header">
        <div className="button active">
          <h2>{issueToEdit === null ? "Create new issue" : "Edit issue"}</h2>
        </div>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <label htmlFor="topic">Topic:</label>
          <input
            name="topic"
            id="topic"
            type="text"
            value={formValues.topic}
            onChange={onFormChange}
          />
          <label htmlFor="question">Question:</label>
          <textarea
            type="text"
            id="question"
            name="question"
            value={formValues.question}
            onChange={onFormChange}
          />
          <label htmlFor="what_I_tried">What I Tried:</label>
          <textarea
            type="text"
            id="what_I_tried"
            name="what_I_tried"
            value={formValues.what_I_tried}
            onChange={onFormChange}
          />
          <label htmlFor="code_language"></label>
          <select
            id="code_language"
            name="code_language"
            value={formValues.code_language}
            onChange={onFormChange}
          >
            {PROGRAMMING_LANGUAGES.sort().map((lang) => {
              return <option key={uuid()}>{lang}</option>;
            })}
          </select>
          <button>Submit</button>
        </form>
      </div>
    </StyledForm>
  );
}
