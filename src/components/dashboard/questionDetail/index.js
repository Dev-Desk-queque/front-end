import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteIssue,
  getIssues,
  editIssue,
  sendAnswer,
} from "../../../actions";
import { useParams, Link, useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import useAxios from "../../../hooks/useAxios";
import styled from "styled-components";
import AnswerForm from "./answerForm";
import Answer from "./answer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  grid-gap: 2rem;
  align-items: center;
  overflow-y: scroll;
  .back-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      color: black;
      font-size: 2rem;
      border: thin solid black;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      transition: 0.125s ease-in-out all;
      box-shadow: none;
      &:hover {
        transition: 0.125s ease-in-out all;
        background: black;
        color: white;
        box-shadow: 0rem 0rem 1rem 0rem grey;
      }
    }
  }
  .question {
    grid-column: 2 / 5;
    grid-row: 2 / 5;
    grid-gap: 1rem;
    display: grid;
    justify-content: center;
    align-items: center;
    background: white;
    width: 75%;
    min-height: 15rem;
    box-shadow: 0.125rem 0.125rem 0.5rem 0rem black;
    border-radius: 2rem;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(6, 1fr);
    .topic {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      grid-row: 1 / 2;
      grid-column: 3 / 5;
      font-size: 2rem;
    }
    .username {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 2rem;
      font-style: italic;
    }
    .content {
      grid-column: 2 / 6;
      grid-row: 2 / 6;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 1.5rem;
    }
    .edit,
    .delete,
    .answer {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .edit {
      grid-column: 2 / 3;
      grid-row: 6 / 7;
    }
    .answer {
      grid-column: 2 / 6;
      grid-row: 5 / 6;
    }
    .delete {
      grid-column: 5 / 6;
      grid-row: 6 / 7;
    }
    .answers {
      grid-row: 6 / 7;
      grid-column: 2 / 6;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      div {
        margin: 0.25rem 0rem;
        padding: 0.75rem 0rem;
        border: thin solid black;
        width: 100%;
        text-align: center;
        flex-wrap: wrap;
      }
    }
  }
`;

export default function QuestionDetails() {
  const { id } = useParams();
  const { push: reroute } = useHistory();
  const { axiosWithAuth: axios } = useAxios();
  const dispatch = useDispatch();
  const question = useSelector((state) =>
    state.issues.find((issue) => issue.id.toString() === id)
  );
  const user = useSelector((state) => state.user);

  const [deleteEnabled, setDeleteEnabled] = useState(true);
  const [isAnswering, setIsAnswering] = useState(false);
  const [answerValues, setAnswerValues] = useState({ answer: "" });

  function handleEdit(e) {
    e.preventDefault();
    dispatch(
      editIssue({
        issue: question,
        callback: () => {
          reroute("/create-issue");
        },
      })
    );
  }

  function handleDelete(e) {
    e.preventDefault();
    setDeleteEnabled(false);
    dispatch(
      deleteIssue({
        axios,
        issue: question,
        callback: () => {
          dispatch(
            getIssues(axios, () => {
              reroute("/dashboard");
            })
          );
        },
      })
    );
  }

  function handleAnswer(e) {
    e.preventDefault();
    setIsAnswering(!isAnswering);
  }

  function handleAnswerSubmit(e) {
    e.preventDefault();
    const answer = {
      answer: answerValues.answer,
      question_id: question.id,
      answer_user_id: user.id,
    };
    dispatch(
      sendAnswer({
        axios,
        answer,
        issue: question,
        callback: () => {
          dispatch(getIssues(axios));
          setAnswerValues({...answerValues, answer: ""});
          setIsAnswering(false);
        },
      })
    );
  }

  function onAnswerFormChange(e) {
    const { name, value } = e.target;
    setAnswerValues({ ...answerValues, [name]: value });
  }

  return (
    <Container>
      <div className="back-button">
        <Link to="/dashboard">Back</Link>
      </div>
      {question && (
        <section className="question">
          <div className="topic">
            <h1>Topic: {question.topic}</h1>
          </div>
          <div className="content">
            <p>{question.question}</p>
            <p>I tried: {question.what_I_tried}</p>
          </div>
          <div className="username">
            <p>{question.username}</p>
          </div>
          {user.id === question.question_user_id && (
            <React.Fragment>
              <div className="edit">
                <button onClick={handleEdit}>Edit</button>
              </div>
              <div className="delete">
                <button onClick={handleDelete} disabled={!deleteEnabled}>
                  Delete
                </button>
              </div>
            </React.Fragment>
          )}
          {user.id !== question.question_user_id && (
            <React.Fragment>
              <div className="answer">
                {!isAnswering ? (
                  <button onClick={handleAnswer}>Answer</button>
                ) : (
                  <AnswerForm
                    values={answerValues}
                    onUpdate={onAnswerFormChange}
                    onSubmit={handleAnswerSubmit}
                    onCancel={(e) => {
                      e.preventDefault();
                      setIsAnswering(false);
                    }}
                  />
                )}
              </div>
            </React.Fragment>
          )}
          {question.answers.length > 0 && (
            <div className="answers">
              {question.answers.map((answer) => {
                return <Answer answer={answer} user={user} key={uuid()} />;
              })}
            </div>
          )}
        </section>
      )}
    </Container>
  );
}
