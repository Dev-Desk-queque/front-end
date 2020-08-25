import React from "react";
import Sidebar from "./sidebar";
import IssueList from "./issueList";

export default function Issues(props) {
  return (
    <React.Fragment>
      <Sidebar />
      <IssueList />
    </React.Fragment>
  );
}
