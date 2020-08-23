import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 7rem;
  background: #F0F4F7;
`;

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Container>
          <Switch>
            <Route path="/login">
              <h1>Hello World</h1>
            </Route>
          </Switch>
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
