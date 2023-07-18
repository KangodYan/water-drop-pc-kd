import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { useUserContext } from '@/hooks/userHooks';
import { AUTH_TOKEN } from '@/utils/constants';

import { ROUTE_KEY, routes } from '@/routes/menus';
import { useGoTo, useIsOrgRoute } from '@/hooks';
import { Space, Tooltip } from 'antd';
import { LogoutOutlined, ShopOutlined } from '@ant-design/icons';
import OrgSelect from '../OrgSelect';

/**
 * 菜单切换
 */
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
  // 判断是否显示门店选择器
  const isOrg = useIsOrgRoute();
  const { go } = useGoTo();
  const nav = useNavigate();

  const logoutHandler = () => {
    sessionStorage.setItem(AUTH_TOKEN, '');
    localStorage.setItem(AUTH_TOKEN, '');
    nav('/login');
  };

  const goToOrg = () => {
    go(ROUTE_KEY.ORG);
  };

  return (
    // [高级布局]详见antd pro文档https://procomponents.ant.design/components/layout
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
      actionsRender={() => [
        !isOrg && <OrgSelect />,
        <Tooltip title="门店管理">
          <ShopOutlined onClick={goToOrg} />
        </Tooltip>,
      ]}
    >
      <div key={store.currentOrg}>
        {outlet}
      </div>
    </ProLayout>
  );
};

export default Layout;
