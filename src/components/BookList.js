import React from 'react';
import {useQuery} from '@apollo/client';
import {getBooksQuery} from '../queries/queries';

function displayBook(results) {
  const {loading, error, data} = results;
  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message}`;

  return data.books.map(({name, id}) => <li key={id}>{name}</li>);
}

function BookList() {
  const results = useQuery(getBooksQuery);

  return (
    <div>
      <ul id="book-list">{displayBook(results)}</ul>
    </div>
  );
}

export default BookList;
