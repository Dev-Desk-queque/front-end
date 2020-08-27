/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { updateFilter } from "../../../../actions";
import useForm from "../../../../hooks/useForm";

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: grey;
  border-bottom: thin solid black;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0rem 1.5rem;
      input {
        margin: 0rem 0.5rem;
      }
    }
  }
`;

export default function Filter() {
  const globalFilter = useSelector((state) => state.issueFilter);
  const [filter, setFilter] = useForm(globalFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFilter(filter));
  }, [filter]);

  return (
    <Container>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Show Answered
          <input
            name="showAnswered"
            id="showAnswered"
            type="checkbox"
            onChange={setFilter}
            checked={filter.showCompleted}
          />
        </label>
        <label htmlFor="textSearch">
          Search:
          <input
            name="textSearch"
            type="text"
            id="textSearch"
            onChange={setFilter}
            value={filter.textSearch}
          />
        </label>
      </form>
    </Container>
  );
}
