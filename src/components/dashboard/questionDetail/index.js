import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteIssue, getIssues, editIssue } from "../../../actions";
import { useParams, Link, useHistory } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import styled from "styled-components";

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
      grid-row: 1 / 2;
      grid-column: 3 / 5;
      font-size: 2rem;
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
    .delete {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .edit {
      grid-column: 2 / 3;
      grid-row: 6 / 7;
    }
    .delete {
      grid-column: 5 / 6;
      grid-row: 6 / 7;
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
        </section>
      )}
    </Container>
  );
}
