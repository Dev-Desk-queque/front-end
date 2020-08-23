import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  background: black;
  color: white;
  padding: 0rem 10rem;
  position: fixed;
  top: 0;
  width: 100%;
  .title {
    font-size: 2.5rem;
  }
  .links {
    a,
    .link {
      color: white;
      text-decoration: none;
      font-size: 2rem;
      cursor: pointer;
      border: thin solid white;
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      transition: 0.125s ease-in-out all;
      &:hover {
        transition: 0.125s ease-in-out all;
        color: black;
        background: white;
        border: thin solid black;
      }
    }
  }
`;

export default (props) => {
  const { updateToken, token } = useAxios();

  function handleLogout(e) {
    e.preventDefault();
    updateToken(null);
  }

  return (
    <>
      {token !== undefined && token !== null ? (
        <Container>
          <div className="title">
            <h1>DeskOverflow</h1>
          </div>
          <div className="links">
            <div className="link" onClick={handleLogout}>
              Logout
            </div>
          </div>
        </Container>
      ) : (
        <Container>
          <div className="title">
            <h1>DeskOverflow</h1>
          </div>
          <div className="links">
            <NavLink to="/login">Login</NavLink>
          </div>
        </Container>
      )}
    </>
  );
};
