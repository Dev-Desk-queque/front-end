/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Issue from "./issue";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export default function Issues(props) {
  const issues = useSelector((state) => state.issues);

  return (
    <Container>
      {issues.length > 0 ? (
        issues.map((issue) => {
          return <Issue issue={issue} key={issue.key} />;
        })
      ) : (
        <React.Fragment />
      )}
    </Container>
  );
}
