import React from "react";
import styled from "styled-components";
import DynamicLink from "../DynamicLink";
import useAxios from "../../hooks/useAxios";

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 7rem;
  background: #2f2b4a;
  color: #ec3944;
  padding: 0rem 10rem;
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0rem 0rem 1rem 0rem black;
  .title {
    font-size: 2.5rem;
  }
  .links {
    display: flex;
    justify-content: center;
    align-items: center;
    a,
    .link {
      color: #ec3944;
      text-decoration: none;
      font-size: 2rem;
      cursor: pointer;
      border: thin solid #ec3944;
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      transition: 0.125s ease-in-out all;
      margin-left: 0.5rem;
      &:hover {
        transition: 0.125s ease-in-out all;
        color: #2f2b4a;
        background: #ec3944;
        border: thin solid #ec3944;
      }
    }
  }
`;

export default (props) => {
  const { token, logUserOut } = useAxios("");

  function handleLogout(e) {
    e.preventDefault();
    logUserOut();
  }

  return (
    <>
      {token !== undefined && token !== null ? (
        <Container>
          <div className="title">
            <h1>DeskOverflow</h1>
          </div>
          <div className="links">
            <DynamicLink
              to="/create-issue"
              back="/dashboard"
              backText="Dashboard"
            >
              New Issue
            </DynamicLink>
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
            <DynamicLink
              to="/login"
              back="https://lambda-dev-desk-queue-ui.netlify.app/"
              backText="Home"
              isExternalBack
            >
              Login
            </DynamicLink>
          </div>
        </Container>
      )}
    </>
  );
};
