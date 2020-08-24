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

const errorKeyframe = keyframes`
  from {
    transform: translate(100vw, 0%);
  }
  to {
    transform: translate(0%, 0%);
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;
  .errors {
    background: #ec3944;
    color: #2f2b4a;
    padding: 1rem 2rem;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${errorKeyframe} .25s ease-out forwards;
    z-index: -1;
    p {
      font-size: 1.5rem;
      font-weight: bolder;
    }
    margin-bottom: 2rem;
    box-shadow: 0rem 0rem 0.25rem 0rem black;
  }
`;

function App() {
  const { token, axiosWithAuth: axios } = useAxios();
  const dispatch = useDispatch();
  const networkError = useSelector((state) => state.networkError);

  useEffect(() => {
    if (token) {
      dispatch(getIssues(axios));
    }
  }, [token]);

  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Container>
          {networkError && (
            <div className="errors">
              <p>{networkError}</p>
            </div>
          )}
          {/* Insert all routes between this switch statement */}
          <Switch>
            <Route path="/login">
              <h2>NO LOGIN FOR YOU!</h2>
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
