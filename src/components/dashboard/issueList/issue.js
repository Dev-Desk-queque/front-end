/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { deleteIssue, getIssues, getIssueUser } from "../../../actions";
import { HighlightedString } from "../../../utils/wordSearch";

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 1rem;
  width: 100%;
  box-shadow: 0.0625rem 0.0625rem 0.25rem 0rem #2f2b4a;
  background: white;
  min-height: 20rem;
  padding: 1rem 2rem;
  margin: 1rem;
  border-radius: 0.75rem;
  border: none;
  &.deleting {
    box-shadow: none;
    filter: opacity(0.5);
  }
  &:hover {
    box-shadow: 0.325rem 0.325rem 0.75rem 0rem #2f2b4a;
    cursor: pointer;
  }
  .title {
    grid-column: 2 / 4;
    text-align: center;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:first-child {
      grid-row: 1 /2;
    }
    &:last-child {
      grid-row: 5 / 6;
    }
  }
  button {
    grid-column: 4 / 5;
    grid-row: 5 / 6;
  }
  .content-preview {
    grid-column: 2 / 4;
    grid-row: 2 / 5;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    font-size: 1.5rem;
    border: thin solid black;
  }
  .username {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    font-size: 1.75rem;
  }
`;

export default function Issue({ issue, isMyIssue, ...props }) {
  const { axiosWithAuth: axios } = useAxios();
  const dispatch = useDispatch();
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const { push: reroute } = useHistory();

  function handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    setButtonEnabled(false);
    dispatch(
      deleteIssue({ axios, issue, callback: () => dispatch(getIssues(axios)) })
    );
  }
  
  useEffect(() => {
    if (!issue.username) {
      dispatch(getIssueUser({ axios, issue }));
    }
  }, []);

  function handleClick(e) {
    e.preventDefault();
    reroute(`/dashboard/question/${issue.id}`);
  }

  return (
    <Container onClick={handleClick} className={!buttonEnabled && "deleting"}>
      <div className="title">
        <h5>Topic: {HighlightedString(issue.topic)}</h5>
      </div>
      <div className="username">
        <p>{issue.username && issue.username}</p>
      </div>
      <div className="title">
        <p>Lang: {HighlightedString(issue.code_language)}</p>
      </div>
      <div className="content-preview">
        <p>{HighlightedString(issue.question)}</p>
      </div>
      {isMyIssue && (
        <button onClick={handleDelete} disabled={!buttonEnabled}>
          Delete
        </button>
      )}
    </Container>
  );
}
