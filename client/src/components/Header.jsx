import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Book Search and Management App</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/search">Search Books</Link>
        <Link to="/saved">Saved Books</Link>
      </nav>
    </header>
  );
};

export default Header;
