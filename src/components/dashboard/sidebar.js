import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

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
  section.issues {
    background: black;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default function Sidebar() {
  const user = useSelector((state) => state.user);
  const watchedIssues = useSelector((state) =>
    state.issues.filter((issue) => {
      return issue.question_user_id === user.id;
    })
  );
  return (
    <Container>
      <h1>Watching</h1>
      <section className="issues">
        {watchedIssues.map((issue) => {
          return <h1 key={issue.key}>{issue.topic}</h1>;
        })}
      </section>
    </Container>
  );
}
