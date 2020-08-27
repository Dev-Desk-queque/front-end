import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-gap: 2rem;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  .back-button {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
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
    width: 100%;
    height: 100%;
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
  }
`;

export default function QuestionDetails() {
  const { id } = useParams();
  const question = useSelector((state) =>
    state.issues.find((issue) => issue.id.toString() === id)
  );

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
        </section>
      )}
    </Container>
  );
}
