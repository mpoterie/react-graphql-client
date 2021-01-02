import React from 'react';
import {useQuery, gql} from '@apollo/client';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

function displayAuthors(results) {
  const {loading, data} = results;
  if (loading) return <option disabled>Loading Authors...</option>;
  return data.authors.map(({name, id}) => (
    <option key={id} value={id}>
      {name}
    </option>
  ));
}

function AddBook() {
  const results = useQuery(getAuthorsQuery);

  return (
    <div>
      <form id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Author:</label>
          <select>
            <option>Select Author</option>
            {displayAuthors(results)}
          </select>
        </div>

        <button></button>
      </form>
    </div>
  );
}

export default AddBook;
