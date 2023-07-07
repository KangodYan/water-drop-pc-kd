import React from 'react';
import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import { client } from './utils/apollo';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
