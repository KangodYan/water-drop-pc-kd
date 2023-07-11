import { useGoTo } from '@/hooks';
import { useUserContext } from '@/hooks/userHooks';
import { ROUTE_KEY } from '@/routes/menus';
import { Button } from 'antd';
import style from './index.module.less';

/**
*
*/
const Home = () => {
  const { store } = useUserContext();
  const { go } = useGoTo();
  return (
    <div className={style.container}>
      <Button onClick={() => go(ROUTE_KEY.MY)}>
        去个人中心
        {store.tel}
      </Button>
    </div>
  );
};

export default Home;
