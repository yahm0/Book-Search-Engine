import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Search for Books</Link>
      {Auth.loggedIn() ? (
        <>
          <Link to="/saved">See My Books</Link>
          <a href="/" onClick={() => Auth.logout()}>Logout</a>
        </>
      ) : (
        <Link to="/login">Login/Signup</Link>
      )}
    </nav>
  );
};

export default Navbar;
