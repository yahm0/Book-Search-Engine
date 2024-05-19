import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId) => {
    try {
      await removeBook({
        variables: { bookId },
      });

      console.log('book removed');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div>
        <h1>Viewing saved books!</h1>
        <div>
          {userData.savedBooks?.map((book) => (
            <div key={book.bookId}>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <img src={book.image} alt={book.title} />
              <p>Authors: {book.authors.join(', ')}</p>
              <a href={book.link} target="_blank" rel="noopener noreferrer">More Info</a>
              <button onClick={() => handleDeleteBook(book.bookId)}>Delete Book</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SavedBooks;