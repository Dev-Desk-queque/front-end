import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Filter from "./filter";
import Issue from "./issue";

const Container = styled.div`
  display: grid;
  flex-wrap: wrap;
  justify-content: center;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem auto;
  align-items: center;
  height: 100%;
  width: 100%;
  .issues {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
  }
`;

export default function IssueList() {
  const issues = useSelector((state) => state.issues);
  const user = useSelector((state) => state.user);

  return (
    <React.Fragment>
      <Container>
        <Filter />
        <section className="issues">
          {issues.length > 0 ? (
            issues.map((issue) => {
              const myIssue = issue.question_user_id === user.id;
              return (
                <Issue issue={issue} key={issue.key} isMyIssue={myIssue} />
              );
            })
          ) : (
            <React.Fragment />
          )}
        </section>
      </Container>
    </React.Fragment>
  );
}
