import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { useUserContext } from '@/hooks/userHooks';
import { AUTH_TOKEN } from '@/utils/constants';

import { ROUTE_KEY, routes } from '@/routes/menus';
import { useGoTo } from '@/hooks';
import { Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

// 菜单切换
const menuItemRender = (
  item: MenuDataItem,
  dom: React.ReactNode,
) => <Link to={item.path || '/'}>{dom}</Link>;

/**
* 外层框架
*/
const Layout = () => {
  // 路由插槽，显示页面内容用的
  const outlet = useOutlet();
  const { store } = useUserContext();
  const { go } = useGoTo();
  const nav = useNavigate();

  const logoutHandler = () => {
    sessionStorage.setItem(AUTH_TOKEN, '');
    localStorage.setItem(AUTH_TOKEN, '');
    nav('/login');
  };

  return (
    // 详见antd pro文档https://procomponents.ant.design/components/layout
    <ProLayout
      layout="mix"
      siderWidth={150}
      menuItemRender={menuItemRender}
      // 路由配置
      route={{
        path: '/',
        routes,
      }}
      // 个人头像设置
      avatarProps={{
        src: store.avatar || null,
        title: store.tel,
        size: 'small',
        onClick: () => go(ROUTE_KEY.MY),
      }}
      // 底部快捷操作
      links={[
        // 点击按钮退出登录
        <Space size={20} onClick={logoutHandler}>
          <LogoutOutlined />
          退出
        </Space>,
      ]}
      title={false}
      logo={<img src="https://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png" alt="logo" />}
      onMenuHeaderClick={() => nav('/')}
    >
      <div key={store.currentOrg}>
        {outlet}
      </div>
    </ProLayout>
  );
};

export default Layout;
