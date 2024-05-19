import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth'; // Import authentication utilities

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Search for Books</Link> {/* Link to the SearchBooks page */}
      {isAuthenticated() ? (
        <>
          <Link to="/saved">See My Books</Link> {/* Link to the SavedBooks page */}
          <a href="/" onClick={() => logout()}>Logout</a> {/* Logout link */}
        </>
      ) : (
        <Link to="/login">Login/Signup</Link> // Link to the Login/Signup page
      )}
    </nav>
  );
};

export default Navbar; // Export Navbar component as the default export
