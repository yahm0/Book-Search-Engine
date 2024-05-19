import React from 'react'; // Import React to use JSX.
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation.
import Auth from '../utils/auth'; // Import authentication utility.

const Navbar = () => {
  return (
    <nav>
      {/* Link to the home page for searching books */}
      <Link to="/">Search for Books</Link>

      {Auth.loggedIn() ? (
        <>
          {/* Link to the saved books page if the user is logged in */}
          <Link to="/saved">See My Books</Link>
          {/* Link to log out the user */}
          <a href="/" onClick={() => Auth.logout()}>Logout</a>
        </>
      ) : (
        // Link to the login/signup page if the user is not logged in
        <Link to="/login">Login/Signup</Link>
      )}
    </nav>
  );
};

export default Navbar; // Export the Navbar component.
