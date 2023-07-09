import { Spin } from 'antd';

import { IPropChild } from '@/utils/types';
import { connect, useGetUser } from '@/hooks/userHooks';

/**
* 获取用户信息组件
*/
const UserInfo = ({ children }: IPropChild) => {
  // 调用user数据处理的hooks
  const { loading } = useGetUser();
  // 加入等待时的loading
  return (
    <Spin spinning={loading}>
      <div style={{ height: '100vh' }}>
        {children}
      </div>
    </Spin>
  );
};

export default connect(UserInfo);
