import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  align-items: center;
  width: 25rem;
  height: 100%;
  box-shadow: 0rem 0rem 0.25rem 0rem black;
  overflow-y: auto;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0rem;
    border-top: thin solid black;
    border-bottom: thin solid black;
    width: 100%;
    padding: 2rem 0rem;
    h2 {
      cursor: pointer;
    }
    section.issues {
      width: 100%;
      display: flex;
      text-overflow: clip;
      text-align: center;
      flex-direction: column;
      align-items: center;
      transition: 0.25s ease-in-out all;
      &.closed {
        height: 0%;
        display: none;
        overflow: hidden;
        transition: 0.25s ease-in-out all;
      }
      &.opened {
        height: max-content;
        display: flex;
        overflow: hidden;
        transition: 0.25s ease-in-out all;
      }
      li {
        margin: 0.5rem 0rem;
        cursor: pointer;
        font-size: 1.25rem;
        padding: 0.25rem;
        transition: 0.125s ease-in-out all;
        list-style: none;
        &:hover {
          background: #2f2b4a;
          color: white;
        }
      }
    }
  }
`;

export default function Sidebar() {
  const [watchedOpened, setWatchedOpened] = useState(false);
  const [myAnswersOpened, setMyAnswersOpened] = useState(false);

  const { push: reroute } = useHistory();

  const user = useSelector((state) => state.user);
  const myIssues = useSelector((state) =>
    state.issues.filter((issue) => {
      return issue.question_user_id === user.id;
    })
  );
  const myAnswers = useSelector((state) => {
    const toReturn = state.issues.filter((issue) => {
      let shouldReturn = false;
      issue.answers.forEach((answer) => {
        if (answer.answer_user_id === user.id) {
          shouldReturn = true;
        }
      });
      if (shouldReturn) {
        return issue;
      } else return null;
    });
    return toReturn;
  });

  return (
    <Container>
      <div>
        <h2
          onClick={() => {
            setWatchedOpened(!watchedOpened);
          }}
        >
          My Questions:
        </h2>
        <section className={`issues ${watchedOpened ? "opened" : "closed"}`}>
          <ul>
            {myIssues.map((issue) => {
              return (
                <li
                  key={issue.key}
                  onClick={() => reroute(`/dashboard/question/${issue.id}`)}
                >
                  {issue.topic}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
      <div>
        <h2 onClick={() => setMyAnswersOpened(!myAnswersOpened)}>
          Questions I Answered:
        </h2>
        <section className={`issues ${myAnswersOpened ? "opened" : "closed"}`}>
          <ul>
            {myAnswers.map((question) => {
              return (
                <li
                  key={uuid()}
                  onClick={() => reroute(`/dashboard/question/${question.id}`)}
                >
                  {question.topic} - {question.username}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </Container>
  );
}
