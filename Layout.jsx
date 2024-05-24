import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.css"

function Layout() {
  return (
    <div className="container">
      <Link to="/">
        <button>HOME</button>
      </Link>
      <Link to="/form">
        <button>NEW USER</button>
      </Link>
      <Link to="/users">
        <button>DISPLAY USERS</button>
      </Link>
      <Outlet />
    </div>
  );
}

export default Layout;
