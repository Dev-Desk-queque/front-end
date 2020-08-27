import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getIssues, deleteAnswer } from "../../../actions";
import useAxios from "../../../hooks/useAxios";

const Container = styled.div`
  position: relative;
  .delete {
    all: unset;
    position: absolute;
    left: calc(100% - 2rem);
    top: 0;
    font-size: 1.25rem;
    width: 2rem;
    height: 2rem;
    border: thin solid black;
    background: red;
    color: white;
    cursor: pointer;
  }
`;

export default function Answer({ answer, user, ...props }) {
  const isMyAnswer = answer.answer_user_id === user.id;
  const { axiosWithAuth: axios } = useAxios();

  const dispatch = useDispatch();

  function handleDeleteClick(e) {
    e.preventDefault();
    console.log("delete clicked");
    dispatch(
      deleteAnswer({
        axios,
        answer,
        callback: () => {
          dispatch(getIssues(axios));
        },
      })
    );
  }

  return (
    <Container className="answer">
      <p>{answer.answer}</p>
      {isMyAnswer && (
        <button className="delete" onClick={handleDeleteClick}>
          X
        </button>
      )}
    </Container>
  );
}
