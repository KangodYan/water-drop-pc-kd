import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import {
  ROUTE_CONFIG,
  ROUTE_KEY,
  getRouteByKey, routes,
} from '@/routes/menus';

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  });
};

// 通用页面跳转，通过页面key来跳转，和整体路由分离
export const useGoTo = () => {
  const nav = useNavigate();
  const back = () => nav(-1);
  const go = (
    pageKey?: string,
    params?: Record<string, string | number>,
  ) => {
    // 默认首页
    if (!pageKey) {
      nav('/');
      return;
    }
    const route = getRouteByKey(pageKey);
    if (route && route.path) {
      if (!params) {
        nav(`/${route.path}`);
        return;
      }
      // /page/:id = if(id==1) => /page/1
      const url = route.path.replace(
        /\/:(\w+)/g,
        (exp: string, exp1: string) => `/${params[exp1]}`,
      );
      nav(`/${url}`);
    }
  };
  return { back, go };
};

/**
 * 获取当前 URL 匹配的路由
 */
export const useMatchedRoute = () => {
  const r = useLocation();
  // useMemo缓存结果值，重新渲染时无变化则直接返回
  const route = useMemo(() => routes.find(
    (item) => matchPath(`/${item.path}`, r.pathname),
  ), [r.pathname]);
  return route;
};

/**
 * 判断是否显示门店选择器
 */
export const useIsOrgRoute = () => {
  // 获取当前路由
  const curRoute = useMatchedRoute();
  // 判断当前页面是否是门店管理页面
  if (curRoute?.path === ROUTE_CONFIG[ROUTE_KEY.ORG].path) {
    return true;
  }
  return false;
};
