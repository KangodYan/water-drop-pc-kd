import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { routes } from './routes/menus';
import { client } from './utils/apollo';
import Page404 from './containers/Page404';
import UserInfo from './components/UserInfo';
import Layout from './components/Layout';
import Login from './containers/Login';
import { ROUTE_COMPONENT } from './routes';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    {/* 浏览器导航 */}
    <BrowserRouter>
      {/* UserInfo在Routes外层，所以需在登录成功后重新refresh */}
      <UserInfo>
        <Routes>
          {/* 登录页面应在Layout外面，不显示菜单 */}
          <Route path="/login" element={<Login />} />
          {/* 内部为andt pro的ProLayout */}
          <Route path="/" element={<Layout />}>
            {/* 循环路由配置 */}
            {routes.map((item) => {
              const Component = ROUTE_COMPONENT[item.key];
              return (
                <Route
                  path={item.path}
                  key={item.key}
                  element={<Component />}
                />
              );
            })}
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </UserInfo>
    </BrowserRouter>
  </ApolloProvider>,
);
