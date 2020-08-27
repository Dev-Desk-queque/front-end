import React from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  label{
      font-size: 1.5rem;
  }
  textarea {
      width: 100%;
      resize: none;
  }
  div.buttons {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function AnswerForm({
  onSubmit,
  onUpdate,
  values,
  onCancel,
  ...props
}) {
  return (
    <Form onSubmit={onSubmit}>
      <label htmlFor="answer">Answer</label>
      <textarea
        id="answer"
        name="answer"
        value={values.answer}
        onChange={onUpdate}
      />
      <div className="buttons">
        <button type="reset" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </Form>
  );
}
