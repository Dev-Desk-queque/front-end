import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Filter from "./filter";
import Issue from "./issue";
import { search } from "../../../utils/wordSearch";

const Container = styled.div`
  display: grid;
  flex-wrap: wrap;
  justify-content: center;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem auto;
  align-items: center;
  overflow: hidden;
  height: 100%;
  width: 100%;
  .issues {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    height: 100%;
    align-items: flex-start;
    overflow-x: hidden;
    overflow-y: scroll;
  }
`;

export default function IssueList() {
  const issues = useSelector((state) => state.issues);
  const user = useSelector((state) => state.user);
  const globalFilter = useSelector((state) => state.issueFilter);

  return (
    <React.Fragment>
      <Container>
        <Filter />
        <section className="issues">
          {issues.length > 0 ? (
            issues
              // eslint-disable-next-line array-callback-return
              .filter((issue) => {
                if (globalFilter.textSearch) {
                  let found = false;
                  Object.keys(issue).forEach((k) => {
                    if (typeof issue[k] === "string") {
                      if (search(issue[k], globalFilter.textSearch)) {
                        found = true;
                      }
                    }
                  });
                  if (found) {
                    return issue;
                  }
                } else return issue;
              })
              .map((issue) => {
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
