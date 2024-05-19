import React from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
