const jwt = require('jsonwebtoken'); // Import jsonwebtoken library for creating and verifying JWTs.

const secret = process.env.JWT_SECRET; // The secret key for signing the JWT, retrieved from environment variables.
const expiration = '2h'; // The expiration time for the JWT.