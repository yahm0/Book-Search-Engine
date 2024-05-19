import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import { searchGoogleBooks } from '../utils/API';
import Auth from '../utils/auth';


const SearchBooks = () => {
    const [saveBook] = useMutation(SAVE_BOOK);
    const [searchInput, setSearchInput] = useState('');
    const [searchedBooks, setSearchedBooks] = useState([]);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      if (!searchInput) {
        return false;
      }
  
      try {
        const response = await searchGoogleBooks(searchInput);
  
        if (!response.ok) {
          throw new Error('something went wrong!');
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

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
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
            {Auth.loggedIn() && (
              <button onClick={() => handleSaveBook(book.bookId)}>Save Book</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchBooks;