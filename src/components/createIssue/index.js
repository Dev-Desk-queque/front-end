import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { submitNewIssue, getIssues } from "../../actions";
import useAxios from "../../hooks/useAxios";
import StyledForm from "../styledForm";
import useForm from '../../hooks/useForm';

const initialFormValues = {
  topic: "",
  question: "",
  what_I_tried: "",
  code_language: "",
};

export default function CreateIssue(props) {
  const [formValues, onFormChange] = useForm(initialFormValues);
  const { push: reroute } = useHistory();

  const dispatch = useDispatch();
  const { axiosWithAuth: axios } = useAxios();

  function handleSubmit(e) {
    e.preventDefault();
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

  return (
    <StyledForm>
      <div className="header">
        <div className="button active">
          <h2>Create a new issue</h2>
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
          <button>Submit</button>
        </form>
      </div>
    </StyledForm>
  );
}
