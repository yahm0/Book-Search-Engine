import React from 'react'; // Import React library
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client'; // Import Apollo Client libraries
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Import React Router libraries
import Navbar from './components/Navbar'; // Import Navbar component
import Header from './components/Header'; // Import Header component
import Footer from './components/Footer'; // Import Footer component
import SearchBooks from './pages/SearchBooks'; // Import SearchBooks page component
import SavedBooks from './pages/SavedBooks'; // Import SavedBooks page component

// Create a new Apollo Client instance
const client = new ApolloClient({
  uri: '/graphql', // GraphQL endpoint URI
  cache: new InMemoryCache(), // Configure cache
});

function App() {
  return (
    // Provide Apollo Client to the application
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header /> {/* Render Header component */}
          <Navbar /> {/* Render Navbar component */}
          <Switch>
            <Route exact path='/' component={SearchBooks} /> {/* Route for SearchBooks page */}
            <Route exact path='/saved' component={SavedBooks} /> {/* Route for SavedBooks page */}
          </Switch>
          <Footer /> {/* Render Footer component */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App; // Export App component as the default export
