import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import { isAuthenticated } from '../utils/auth'; // Import isAuthenticated for checking authentication

const SearchBooks = () => {
  const [saveBook] = useMutation(SAVE_BOOK); // Initialize SAVE_BOOK mutation
  const [searchInput, setSearchInput] = useState(''); // State for search input
  const [searchedBooks, setSearchedBooks] = useState([]); // State for searched books

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        link: book.volumeInfo.infoLink,
      }));

      setSearchedBooks(bookData); // Set searched books data to state
      setSearchInput(''); // Clear search input
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    if (!isAuthenticated()) {
      return false;
    }

    try {
      await saveBook({
        variables: { bookData: { ...bookToSave } },
      });

      console.log('book saved');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Search for a book"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        {searchedBooks.map((book) => (
          <div key={book.bookId}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <img src={book.image} alt={book.title} />
            <p>Authors: {book.authors.join(', ')}</p>
            <a href={book.link} target="_blank" rel="noopener noreferrer">More Info</a>
            {isAuthenticated() && (
              <button onClick={() => handleSaveBook(book.bookId)}>Save Book</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchBooks;
