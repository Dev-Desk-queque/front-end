import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function DynamicLink({
  to,
  back,
  backText,
  isExternalBack,
  ...props
}) {
  const { pathname } = useLocation();

  return (
    <React.Fragment>
      {pathname !== to ? (
        <Link {...props} to={to} />
      ) : (
        <React.Fragment>
          {isExternalBack ? (
            <a href={back}>{backText || "Back"}</a>
          ) : (
            <Link to={back}>{backText || "Back"}</Link>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
