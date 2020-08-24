/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .issue {
    display: grid;
    grid-template-columns: 35% auto;
    grid-template-rows: repeat(5, auto);
    grid-gap: 1rem;
    max-width: 30rem;
    min-width: 20rem;
    box-shadow: 0.0625rem 0.0625rem 0.25rem 0rem #2f2b4a;
    background: white;
    min-height: 20rem;
    padding: 1rem 2rem;
    margin: 1rem;
    border-radius: 2rem;
    .title {
      grid-column: 1 / 3;
      text-align: center;
      font-size: 2rem;
      border-bottom: thin solid black;
    }
    .topic,
    .content,
    .title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .topic {
      grid-column: 1 / 2;
      font-size: 1.5rem;
    }
    .content {
      grid-column: 2 / 3;
    }
  }
`;

export default function Issues(props) {
  const issues = useSelector((state) => state.issues);

  return (
    <Container>
      {issues.length > 0 ? (
        issues.map((issue) => {
          return (
            <div className="issue" key={issue.key}>
              <div className="title">
                <h5>{issue.topic.toUpperCase()}</h5>
              </div>
              <div className="title">Lang: {issue.code_language}</div>
              <h3 className="topic">Question:</h3>
              <p className="content">{issue.question}</p>
              <h3 className="topic">My Attempt:</h3>
              <p className="content">{issue.what_I_tried}</p>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </Container>
  );
}