/* eslint-disable react/jsx-props-no-spreading */
import {
  createContext, useMemo, useState, useContext,
} from 'react';
import { IPropChild } from './types';

// 存储值类型
interface IStore<T> {
  key: string;
  store: T;
  setStore: (payload: Partial<T>) => void;
}

// 处理子组件的函数，store状态应用全局
function getCxtProvider<T>(
  key:string,
  defaultValue: T,
  AppContext: React.Context<IStore<T>>,
) {
  return ({ children }: IPropChild) => {
    const [store, setStore] = useState(defaultValue);
    const value = useMemo(() => ({
      key,
      store,
      setStore: (payload = {}) => setStore((state) => ({
        ...state,
        ...payload,
      })),
    }), [store]);

    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    );
  };
}

// Context缓存
const cxtCache: Record<string, Cxt> = {};

// 「Context」类组件的定义
class Cxt<T = any> {
  // 定义默认存储值
  defaultStore: IStore<T>;

  // 定义Context
  AppContext: React.Context<IStore<T>>;

  // 定义Provider，用于包裹子组件
  Provider: ({ children }: IPropChild) => JSX.Element;

  // 构造方法，初始化定义的三个变量
  constructor(key: string, defaultValue: T) {
    // 赋值defaultStore
    this.defaultStore = {
      key,
      store: defaultValue,
      setStore: () => {},
    };
    // 使用createContext创建Context全局变量
    this.AppContext = createContext(this.defaultStore);
    // 调用Provider处理的function
    this.Provider = getCxtProvider(key, defaultValue, this.AppContext);
    cxtCache[key] = this;
  }
}

// 「export」暴露Context应用
export function useAppContext<T>(key: string) {
  const cxt = cxtCache[key] as Cxt<T>;
  const app = useContext(cxt.AppContext);
  return {
    store: app.store,
    setStore: app.setStore,
  };
}

// 「export」高阶组件包裹，效仿Redux状态管理方法，使用connect
export function connectFactory<T>(
  key: string,
  defaultValue: T,
) {
  const cxt = cxtCache[key];
  let CurCxt: Cxt<T>;
  if (cxt) {
    CurCxt = cxt;
  } else {
    CurCxt = new Cxt<T>(key, defaultValue);
  }
  // 使用Provider包括其他组件，在main.tsx引入，即可全局调用
  return (Child: React.FunctionComponent<any>) => (props: any) => (
    <CurCxt.Provider>
      <Child {...props} />
    </CurCxt.Provider>
  );
}
