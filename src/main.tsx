import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { client } from './utils/apollo';
import './index.css';
import { ROUTE_CONFIG } from './routes';
import Page404 from './containers/Page404';
import UserInfo from './components/UserInfo';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    {/* 浏览器导航 */}
    <BrowserRouter>
      <UserInfo>
        <Routes>
          {/* 循环路由配置 */}
          {ROUTE_CONFIG.map((item) => (
            <Route
              key={item.key}
              path={item.path}
              element={<item.element />}
            />
          ))}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </UserInfo>
    </BrowserRouter>
  </ApolloProvider>,
);
