import { useGoTo } from '@/hooks';
import { useUserContext } from '@/hooks/userHooks';
import { Button, Result } from 'antd';
import { useEffect } from 'react';

/**
* 请选择门店
*/
const NoOrg = () => {
  const { store } = useUserContext();
  const { go } = useGoTo();
  useEffect(() => {
    // 如果全局用户context有存已选择的门店，就跳转到首页
    if (store.currentOrg) {
      go();
    }
  }, [store.currentOrg]);

  return (
    <Result
      status="404"
      title="请选择门店"
      subTitle="所有的管理行为都是基于您选择的门店进行筛选的"
      extra={<Button type="primary" href="/">返回首页</Button>}
    />
  );
};

export default NoOrg;
