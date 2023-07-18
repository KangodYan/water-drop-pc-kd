import { useGoTo } from '@/hooks';
import { useUserContext } from '@/hooks/userHooks';
import { ROUTE_KEY } from '@/routes/menus';
import { useOrganizations } from '@/services/org';
import { LOCAL_CURRENT_ORG } from '@/utils/constants';
import { Select, Space } from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';
import { currentOrg } from '@/utils';

/**
*  门店选择器
*/
const OrgSelect = () => {
  // 不分页的简单查询
  const { data, refetch } = useOrganizations(undefined, undefined, true);
  const { go } = useGoTo();
  const { setStore } = useUserContext();
  // 首次加载
  useEffect(() => {
    // 当前已选择过门店，就存储全局用户context
    if (currentOrg()?.value) {
      setStore({
        currentOrg: currentOrg().value,
      });
    } else {
      // 未选择就跳转到NO_ORG页面
      go(ROUTE_KEY.NO_ORG);
    }
  }, []);

  /**
   * 文本框变化时处理，使用lodash的debounce，添加节流的功能
   */
  const onSearchHandler = _.debounce((name: string) => {
    refetch({
      name,
    });
  }, 300);

  /**
   * 选中option的处理，更新localStorage和全局用户context的值
   */
  const onChangeHandler = (val: { value: string, label: string }) => {
    setStore({
      currentOrg: val.value,
    });
    localStorage.setItem(LOCAL_CURRENT_ORG, JSON.stringify(val));
  };

  return (
    // [布局-间距]详见antd-间距：https://ant.design/components/space-cn#api
    <Space>
      选择门店：
      <Select
        style={{ width: 200 }}
        placeholder="请选择门店"
        showSearch
        onSearch={onSearchHandler}
        filterOption={false}
        defaultValue={currentOrg()}
        onChange={onChangeHandler}
        labelInValue
      >
        {/* 根据API返回数据，来展示对应数量的选项 */}
        {data?.map((item) => (
          <Select.Option
            key={item.id}
            value={item.id}
          >
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};

export default OrgSelect;
