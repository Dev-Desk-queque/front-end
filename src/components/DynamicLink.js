import React from 'react';
import {Link, useLocation} from 'react-router-dom';

export default function DynamicLink({ to, back, backText, ...props }) {
    const { pathname } = useLocation();
  
    return (
      <React.Fragment>
        {pathname !== to ? (
          <Link {...props} to={to} />
        ) : (
          <Link to={back}>{backText || "Back"}</Link>
        )}
      </React.Fragment>
    );
  }