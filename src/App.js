import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import styled from "styled-components";
import PrivateRoute from "./components/PrivateRoute";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;
`;

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Container>
          {/* Insert all routes between this switch statement */}
          <Switch>
            <Route path="/login">
              <h2>NO LOGIN FOR YOU!</h2>
            </Route>

            {/* Ut Oh... Gotta be logged in for this one... */}
            <PrivateRoute path="/dashboard" redirectPath="/test">
              <h2>You may have a token, but NO SOUP FOR YOU!</h2>
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
