import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import useForm from "../../../../hooks/useForm";

const Container = styled.div`
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
      input {
        margin: 0rem 0.25rem;
      }
    }
  }
`;

const initialFilter = {
  showCompleted: false,
};

export default function Filter() {
  const globalFilter = useSelector((state) => state.issueFilter);
  const [filter, setFilter] = useForm(globalFilter || initialFilter);

  return (
    <Container>
      <form>
        <label>
          Show Answered
          <input
            name="showCompleted"
            id="showCompleted"
            type="checkbox"
            onChange={setFilter}
            checked={filter.showCompleted}
          />
        </label>
      </form>
    </Container>
  );
}
