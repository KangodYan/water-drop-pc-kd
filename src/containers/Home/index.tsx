import { useState, useEffect } from 'react';

import style from './index.module.less';

/**
*
*/
const Home = () => {
  const [state, setState] = useState();
  useEffect(() => {
    console.log(state, setState);
  }, []);
  return (<div className={style.container}>首页</div>);
};

export default Home;
