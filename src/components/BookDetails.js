import React from 'react';
import {useQuery} from '@apollo/client';
import {getBookQuery} from '../queries/queries';
import PropTypes from 'prop-types';

function displayBookDetails({data, loading}) {
  if (data && data.book) {
    const {book} = data;
    return (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {book.author.books.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
      </div>
    );
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return <div>No book selected...</div>;
  }
}

function BookDetails({bookId}) {
  const results = useQuery(getBookQuery, {
    variables: {id: bookId},
  });
  return (
    <div id="book-details">
      <p>{displayBookDetails(results)}</p>
    </div>
  );
}

BookDetails.propTypes = {
  bookId: PropTypes.string,
};

export default BookDetails;
