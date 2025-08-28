import React from "react";
import "./index.css";
import { NavLink } from "react-router";

const NavBar = () => {
  return (
    <div className="navbar">
      <h1>Notion Widget Calendar</h1>
      <ul>
        <NavLink to="/">
          <li>Design</li>
        </NavLink>
        <NavLink to="/gallery">
          <li>Gallery</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default NavBar;
