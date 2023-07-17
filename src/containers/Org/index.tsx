import { PageContainer, ProList } from '@ant-design/pro-components';
import { useState } from 'react';
import { Button, Popconfirm, Tag } from 'antd';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { useDeleteOrg, useOrganizations } from '@/services/org';
import EditOrg from './components/EditOrg';

import style from './index.module.less';

const Org = () => {
  // 调用门店列表查询API，接受返回
  const {
    loading, data, page, refetch,
  } = useOrganizations();
  const [delHandler, delLoading] = useDeleteOrg();
  // 状态管理：编辑抽屉的展示和隐藏
  const [showEdit, setShowEdit] = useState(false);
  // 状态管理：检测ID是否需要清空，用于新建/编辑的判断
  const [curId, setCurId] = useState('');

  /**
   * 编辑门店处理，ID赋值，展示有值的编辑抽屉，由dataSource赋值
   */
  const editInfoHandler = (id: string) => {
    setCurId(id);
    setShowEdit(true);
  };

  /**
   * 删除门店处理，传入ID，调用useDeleteOrg中的delHandler请求删除，然后refetch刷新数据
   */
  const delInfoHandler = async (id: string) => {
    delHandler(id, refetch);
  };

  /**
   * 新增门店处理，ID清空、展示空的新建抽屉
   */
  const addInfoHandler = () => {
    setCurId('');
    setShowEdit(true);
  };

  /**
   * 关闭编辑抽屉的处理，隐藏抽屉并刷新数据
   */
  const onCloseHandler = () => {
    setShowEdit(false);
    refetch();
  };

  /**
   * 分页器改变时触发，更新分页数据并重新调用API
   */
  const onPageChangeHandler = (pageNum: number, pageSize: number) => {
    refetch({
      page: {
        pageNum,
        pageSize,
      },
    });
  };

  /**
   * 用于接收API返回的数据，再填充metas中的属性值，可以是字符串、标签、组件、函数
   */
  const dataSource = data?.map((item) => ({
    ...item,
    key: item.id,
    subTitle: <div>{item.tags?.split(',').map((tag) => (<Tag key={tag} color="#5BD8A6">{tag}</Tag>))}</div>,
    actions: [
      <Button type="link" onClick={() => editInfoHandler(item.id)}>编辑</Button>,
      <Popconfirm
        title="提醒"
        okButtonProps={{
          loading: delLoading,
        }}
        description={`确定要删除 ${item.name} 吗？`}
        onConfirm={() => delInfoHandler(item.id)}
      >
        <Button type="link">删除</Button>
      </Popconfirm>,
    ],
    content: item.address,
  }));

  return (
    <div className={style.container}>
      <PageContainer
        // loading是查询列表API中的useQuery返回的
        loading={loading}
        header={{
          title: '门店管理',
        }}
        // 右侧额外内容区
        extra={[
          <Button key="1" type="primary" onClick={addInfoHandler}>新增门店</Button>,
        ]}
      >
        {/* 详见antd pro-高级列表：https://procomponents.ant.design/components/list#api */}
        <ProList<any>
          // 详见antd-分页：https://ant.design/components/pagination-cn#api
          pagination={{
            defaultPageSize: DEFAULT_PAGE_SIZE,
            // 是否展示 pageSize 切换器
            showSizeChanger: false,
            total: page?.total,
            // 分页变化处理
            onChange: onPageChangeHandler,
          }}
          // [栅格间隔和列数]详见antd-栅格：https://ant.design/components/grid-cn#api
          grid={{ gutter: 10, column: 2 }}
          showActions="always"
          // [表格行是否可选择]详见antd-表格：https://ant.design/components/table-cn#rowSelection
          rowSelection={false}
          // [列表项配置，类似 Table 中的 columns]详见antd-表格：https://ant.design/components/table-cn#column
          metas={{
            title: {
              dataIndex: 'name',
            },
            subTitle: {},
            type: {},
            avatar: {
              dataIndex: 'logo',
            },
            content: {
              dataIndex: 'address',
            },
            actions: {
              cardActionProps: 'extra',
            },
          }}
          // [列表数据源]详见antd-列表：https://ant.design/components/list-cn#api
          dataSource={dataSource}
        />
        {/* 编辑抽屉 */}
        {showEdit && (
        <EditOrg
          id={curId}
          onClose={onCloseHandler}
        />
        )}
      </PageContainer>
    </div>
  );
};

export default Org;
