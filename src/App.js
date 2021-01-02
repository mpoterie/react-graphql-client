import React, {Component} from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

// Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Reading List</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
