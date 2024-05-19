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
