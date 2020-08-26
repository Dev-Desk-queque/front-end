import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { iState } from "../reducer";
import { v4 as uuid } from "uuid";

type iSearchReturn = {
  found: boolean;
  formattedReturn?: JSX.Element;
};

const Formatted = styled.span`
  background: grey;
`;

export function search(item: string, searchString: string) {
  const regex = new RegExp(searchString, "i");
  return regex.test(item);
}

export function HighlightedString(string: string): JSX.Element {
  const { textSearch } = useSelector((state: iState) => state.issueFilter);

  const regex = new RegExp(`(${textSearch})`, "i");

  const matched = string.split(regex).map((item: string) => {
    return (
      <React.Fragment key={uuid()}>
        {item.toLowerCase() === textSearch.toLowerCase() ? (
          <Formatted>{textSearch}</Formatted>
        ) : (
          <React.Fragment>{item}</React.Fragment>
        )}
      </React.Fragment>
    );
  });

  return (
    <React.Fragment>{textSearch === "" ? string : matched}</React.Fragment>
  );
}
