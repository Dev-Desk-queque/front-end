import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { iState } from "../reducer";
import { useSelector } from "react-redux";

/**
 * @param {string} redirectPath A path to redirect the user to (optional) if they are not authenticated
 * @summary Will either 1: Allow passage if user is authenticated or 2: Redirect somewhere safe if they are not
 */

interface iPrivateRouteProps extends RouteProps {
  redirectPath?: string;
}

export default (props: iPrivateRouteProps) => {
  const { redirectPath, ...rest } = props;

  const token = useSelector((state: iState) => state.token);
  return (
    <>
      {token !== undefined && token !== null ? (
        <Route {...rest} />
      ) : (
        <Redirect to={redirectPath || "/login"} />
      )}
    </>
  );
};
