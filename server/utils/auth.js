const jwt = require('jsonwebtoken'); // Import jsonwebtoken library for creating and verifying JWTs.

const secret = process.env.JWT_SECRET; // The secret key for signing the JWT, retrieved from environment variables.
const expiration = '2h'; // The expiration time for the JWT.

module.exports = {
    // Middleware function to authenticate requests
    authMiddleware: function ({ req }) {
      // Get the token from the request body, query, or headers.
      let token = req.body.token || req.query.token || req.headers.authorization;
  
      // If the token is found in the authorization header, split the Bearer token and get the actual token.
      if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
      }
  
      // If no token is found, return the request object unmodified.
      if (!token) {
        return req;
      }

      try {
        // Verify the token using the secret key and set the user data to the request object.
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
      } catch {
        console.log('Invalid token'); // Log an error message if the token is invalid.
      }
  
      return req; // Return the request object.
    },
    
    // Function to sign a token with the user's data
    signToken: function ({ username, email, _id }) {
      const payload = { username, email, _id }; // Create a payload with the user's data.
      return jwt.sign({ data: payload }, secret, { expiresIn: expiration }); // Sign and return the JWT with the payload and secret key.
    },
  };