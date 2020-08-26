import React from "react";
import Sidebar from "./sidebar";
import IssueList from "./issueList";
import QuestionDetails from "./questionDetail";
import { Route, Switch } from "react-router-dom";

export default function Issues(props) {
  return (
    <React.Fragment>
      <Sidebar />
      <Switch>
        <Route path="/dashboard/question/:id">
          <QuestionDetails />
        </Route>
        <Route path="/dashboard">
          <IssueList />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
