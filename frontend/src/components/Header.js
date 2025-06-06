import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Coding Platform</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/problems">Problems</Link>
      </nav>
    </header>
  );
};

export default Header;