import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from './constants';

const httpLink = createHttpLink({
  uri: '//localhost:3000/graphql',
});

// 一个拦截器，在请求前加入动作
const authLink = setContext((_, { headers }) => {
  // 从localStorage中取出token
  const token = localStorage.getItem(AUTH_TOKEN);
  // 在请求头里加Authorization，Bearer格式的token
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// 合并拦截器动作到httpLink中
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
