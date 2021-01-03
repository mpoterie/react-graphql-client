import React, {useEffect} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation,
} from '../queries/queries';
import {useForm} from 'react-hook-form';

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
  const [addBook] = useMutation(addBookMutation, {
    refetchQueries: [{query: getBooksQuery}],
  });

  useEffect(() => {
    register({name: 'authorId'}, {required: true});
  }, []);

  const {register, handleSubmit, setValue, errors} = useForm();
  const onSubmit = ({name, authorId, genre}) => {
    addBook({variables: {name, genre, authorId}});
  };

  return (
    <div>
      <form id="add-book" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label>Book name</label>
          <input type="text" name="name" ref={register({required: true})} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input name="genre" type="text" ref={register({required: true})} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select
            name="author"
            onChange={(e) => setValue('authorId', e.target.value)}
          >
            <option>Select Author</option>
            {displayAuthors(results)}
          </select>
        </div>
        {errors.exampleRequired && <span>This field is required</span>}
        <button type="submit">+</button>
      </form>
    </div>
  );
}

export default AddBook;
