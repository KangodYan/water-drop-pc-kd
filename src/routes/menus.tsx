import {
  HomeOutlined, ShopOutlined, UserAddOutlined,
} from '@ant-design/icons';

interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export const ROUTE_KEY = {
  HOME: 'home',
  MY: 'my',
  ORG: 'org',
  COURSE: 'course',
  STUDENT: 'student',
  PRODUCT: 'product',
  TEACHER: 'teacher',
  NO_ORG: 'noOrg',
  PAGE_404: 'p404',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: 'home',
    name: '首页',
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: '个人信息',
    hideInMenu: true,
  },
  [ROUTE_KEY.ORG]: {
    path: 'org',
    name: '门店管理',
    icon: <ShopOutlined />,
    hideInMenu: true,
  },
  [ROUTE_KEY.NO_ORG]: {
    path: 'noOrg',
    name: '选择门店提示',
    hideInMenu: true,
  },
  [ROUTE_KEY.STUDENT]: {
    path: 'student',
    name: '学员管理',
    icon: <UserAddOutlined />,
  },
  [ROUTE_KEY.PAGE_404]: {
    path: '*',
    name: '404',
    hideInMenu: true,
  },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ ...ROUTE_CONFIG[key], key }));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
