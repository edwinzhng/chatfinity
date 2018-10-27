import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import client from './apollo';

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
