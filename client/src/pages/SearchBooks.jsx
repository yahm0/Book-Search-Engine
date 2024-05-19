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
  