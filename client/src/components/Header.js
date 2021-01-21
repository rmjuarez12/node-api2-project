import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to='/' exact activeClassName='current'>
          Home
        </NavLink>
        <NavLink to='/add-post' activeClassName='current'>
          Add Post
        </NavLink>
      </nav>
    </header>
  );
}
