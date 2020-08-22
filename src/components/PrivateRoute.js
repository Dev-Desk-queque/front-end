import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * @param {string?} redirectPath A path to redirect the user to (optional) if they are not authenticated
 * @summary Will either 1: Allow passage if user is authenticated or 2: Redirect somewhere safe if they are not
 */
export default ({ redirectPath, ...props }) => {
  const token = localStorage.getItem("token");
  return (
    <>
      {token !== undefined && token !== null ? (
        <Route {...props} />
      ) : (
        <Redirect to={redirectPath || "/login"} />
      )}
    </>
  );
};
