const { Schema, model } = require('mongoose'); // Import Schema and model from mongoose to create a User model.
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing.

const userSchema = new Schema({
  // Define the schema for the User model
  username: {
    type: String,
    required: true,
    unique: true, // Ensure usernames are unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure emails are unique
  },
  password: {
    type: String,
    required: true, // Password is required
  },
  savedBooks: [
    {
      // Define the schema for saved books
      bookId: {
        type: String,
        required: true, // Book ID is required
      },
      authors: [String], // Authors can be an array of strings
      description: String, // Description of the book
      title: {
        type: String,
        required: true, // Title is required
      },
      image: String, // URL to the book's image
      link: String, // URL to the book's information page
    },
  ],
});

// Middleware to hash the password before saving the user
userSchema.pre('save', async function (next) {
  // If the user is new or the password has been modified
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10; // Define the number of salt rounds for bcrypt
    this.password = await bcrypt.hash(this.password, saltRounds); // Hash the password
  }
  next(); // Proceed to the next middleware or save function
});

// Method to compare the password input with the hashed password stored in the database
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare the input password with the stored hashed password
};

// Create the User model using the userSchema
const User = model('User', userSchema);

// Export the User model
module.exports = User;
