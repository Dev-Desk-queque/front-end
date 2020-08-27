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

const escapeChars = ["(", ")", "[", "]", "^", "$", ".", "+"];

export function search(item: string, searchString: string) {
  if (item) {
    try {
      let parsedSearch = "";
      for (let char of searchString) {
        if (escapeChars.includes(char)) {
          parsedSearch = `${parsedSearch}\\${char}`;
        } else {
          parsedSearch = `${parsedSearch}${char}`;
        }
      }
      const regex = new RegExp(parsedSearch, "igm");
      return regex.test(item);
    } catch (err) {
      return false;
    }
  } else return false;
}

export function HighlightedString(string: string): JSX.Element {
  const { textSearch } = useSelector((state: iState) => state.issueFilter);

  let parsedSearch = "";
  for (let char of textSearch) {
    if (escapeChars.includes(char)) {
      parsedSearch = `${parsedSearch}\\${char}`;
    } else {
      parsedSearch = `${parsedSearch}${char}`;
    }
  }

  const regex = new RegExp(`(${parsedSearch})`, "i");

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
    <React.Fragment>
      {string && textSearch === "" ? string : matched}
    </React.Fragment>
  );
}
