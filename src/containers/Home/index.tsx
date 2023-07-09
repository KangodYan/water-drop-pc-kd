import { useUserContext } from '@/hooks/userHooks';
import style from './index.module.less';

/**
*
*/
const Home = () => {
  const { store } = useUserContext();
  return (<div className={style.container}>{store.tel}</div>);
};

export default Home;
