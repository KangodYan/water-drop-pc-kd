import Home from '@/containers/Home';
import My from '@/containers/My';
import { ROUTE_KEY } from './menus';
import Page404 from '../containers/Page404';

// 为了解决Component和ROUTE_CONFIG的循环依赖，抽取出来
export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.PAGE_404]: Page404,
};
