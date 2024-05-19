import React from 'react';

const BookCard = ({ book, onSave, onRemove }) => {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
      <p>{book.description}</p>
      {book.image && <img src={book.image} alt={book.title} />}
      <p><a href={book.link} target="_blank" rel="noopener noreferrer">More Info</a></p>
      {onSave && <button onClick={() => onSave(book)}>Save Book</button>}
      {onRemove && <button onClick={() => onRemove(book.bookId)}>Remove Book</button>}
    </div>
  );
};

export default BookCard;
