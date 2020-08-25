/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import styled, { keyframes } from "styled-components";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "./hooks/useAxios";
import { getIssues } from "./actions";
import Dashboard from "./components/dashboard";
import CreateIssue from "./components/createIssue";
import Auth from "./components/auth";

const errorKeyframe = keyframes`
  from {
    transform: translate(100vw, 0%);
  }
  to {
    transform: translate(0%, 0%);
  }
`;

const Messages = styled.section`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 0;
  margin-top: 7rem;
  .error {
    background: #ec3944;
    color: #2f2b4a;
  }
  .warn {
    background: whitesmoke;
    color: #ec3944;
  }
  .inform {
    background: green;
    color: #2f2b4a;
  }
  .error,
  .inform,
  .warn {
    filter: opacity(0.825);
    padding: 1rem 2rem;
    width: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${errorKeyframe} 0.25s ease-out forwards;
    z-index: -1;
    p {
      font-size: 1.5rem;
      font-weight: bolder;
    }
    box-shadow: 0rem 0rem 0.25rem 0rem black;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;
`;

function App() {
  const { token, axiosWithAuth: axios } = useAxios();
  const dispatch = useDispatch();
  const systemMessages = useSelector((state) => state.systemMessages);

  useEffect(() => {
    if (token) {
      dispatch(getIssues(axios));
    }
  }, [token]);

  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Messages>
          {systemMessages.length > 0 &&
            systemMessages.map((message) => {
              const cName = () => {
                switch (message.type) {
                  case "ERROR":
                    return "error";
                  case "INFORMATION":
                    return "inform";
                  case "WARNING":
                    return "warn";
                  default:
                    return "";
                }
              };
              return (
                <div className={cName()} key={message.key}>
                  <p>{message.messageText}</p>
                </div>
              );
            })}
        </Messages>
        <Container>
          {/* Insert all routes between this switch statement */}
          <Switch>
            <Route path="/login">
              <Auth />
            </Route>

            {/* Ut Oh... Gotta be logged in for this one... */}
            <PrivateRoute path="/dashboard" redirectPath="/login">
              <Dashboard />
            </PrivateRoute>

            {/* Route to create a new issue */}
            <PrivateRoute path="/create-issue" redirectPath="/login">
              <CreateIssue />
            </PrivateRoute>

            {/* Here is where people will land when they first get here! */}
            <Route exact path="/">
              <h2>Well hiiiii there!!! :D</h2>
            </Route>

            {/* If no valid route, here is a 404 page! Let's make it funny! :D */}
            <Route path="/*">
              <h2>404 Page Not Found</h2>
            </Route>
          </Switch>
          {/* Routes above ^^ */}
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
