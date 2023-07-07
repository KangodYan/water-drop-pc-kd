import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: '//localhost:3000/graphql',
});

export const client = new ApolloClient({
  link: httpLink,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
