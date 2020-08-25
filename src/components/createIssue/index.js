import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { submitNewIssue } from "../../actions";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import useForm from "../../hooks/useForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  form {
    width: 100%;
    display: grid;
    grid-template-columns: 25% 1fr;
    grid-gap: 2rem;
    background: white;
    padding: 5rem 2rem;
    margin-top: 5rem;
    box-shadow: 0.0625rem 0.0625rem 0.125rem 0rem black;
    border-radius: 2rem;
    label,
    input,
    textarea,
    button,
    .title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    textarea,
    input {
      border: thin solid rgba(50, 50, 50, 0.25);
      background: whitesmoke;
    }

    textarea {
      resize: none;
      height: 10rem;
    }
    label {
      grid-column: 1 / 2;
      font-size: 1.25rem;
    }
    input {
      grid-column: 2 / 3;
    }
    .title {
      grid-column: 1 / 3;
    }
    button {
      grid-column: 1 / 3;
      margin: 0rem 5rem;
    }
  }
`;

const issueCreateSchema = yup.object().shape({
  topic: yup.string().required(),
  question: yup.string().required(),
  what_I_tried: yup.string().required(),
  code_language: yup.string().required(),
});

const initialFormValues = {
  topic: "",
  question: "",
  what_I_tried: "",
  code_language: "",
};

const initialFormErrors = initialFormValues;

export default function CreateIssue(props) {
  const [formValues, onFormChange] = useForm(initialFormValues);

  const dispatch = useDispatch();
  const { axiosWithAuth: axios } = useAxios();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(submitNewIssue(axios, formValues));
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="title">
          <h2>Create a new issue</h2>
        </div>
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
    </Container>
  );
}
