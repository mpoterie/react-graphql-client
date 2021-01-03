import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {getBooksQuery} from '../queries/queries';
import BookDetails from './BookDetails';

function BookList() {
  const results = useQuery(getBooksQuery);
  const [selected, setSelected] = useState(null);

  const {loading, error, data} = results;

  return (
    <div>
      <ul id="book-list">
        {loading && <p>Loading...</p>}
        {error && <p>Error! ${error.message}</p>}
        {data &&
          data.books.map(({name, id}) => (
            <li key={id} onClick={() => setSelected(id)}>
              {name}
            </li>
          ))}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default BookList;
