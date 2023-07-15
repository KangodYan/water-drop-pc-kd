import OSSImageUpload from '@/components/OSSImageUpload';
import { UPDATE_USER_INFO } from '@/graphql/user';
import { useUserContext } from '@/hooks/userHooks';
import {
  ProForm, ProFormInstance, ProFormText, ProFormTextArea,
} from '@ant-design/pro-components';
import { useMutation } from '@apollo/client';
import {
  Col,
  Form,
  message,
  Row,
} from 'antd';
import { useEffect, useRef } from 'react';

export default () => {
  const [updateUserInfo] = useMutation(UPDATE_USER_INFO);
  const { store } = useUserContext();
  const formRef = useRef<ProFormInstance>();
  // 表单初始赋值，改变后再赋值
  useEffect(() => {
    formRef?.current?.setFieldsValue({
      name: store.name,
      tel: store.tel,
      desc: store.desc,
      avatar: [{ url: store.avatar }],
    });
  }, [store]);
  return (
    <div>
      <ProForm
        layout="vertical"
        // 提交表单成功后的回调事件
        onFinish={async (values) => {
          const res = await updateUserInfo({
            variables: {
              id: store.id,
              params: {
                name: values.name,
                desc: values.desc,
                avatar: values.avatar[0]?.url || '',
              },
            },
          });
          if (res.data.updateUserInfo.code === 200) {
            store.refetchHandler();
            message.success(res.data.updateUserInfo.message);
          } else {
            message.error(res.data.updateUserInfo.message);
          }
        }}
        // 表单引用
        formRef={formRef}
        submitter={{
        // 配置按钮的属性
          resetButtonProps: {
            style: {
            // 隐藏重置按钮
              display: 'none',
            },
          },
        }}
        params={{}}
      >
        <Row gutter={20}>
          <Col>
            <ProFormText
              width="md"
              name="tel"
              label="手机号"
              tooltip="不能修改"
              disabled
            />
            <ProFormText
              width="md"
              name="name"
              label="昵称"
              placeholder="请输入昵称"
            />
            <ProFormTextArea
              colProps={{ span: 24 }}
              name="desc"
              label="个人简介"
              width="md"
              placeholder="请输入个人简介"
            />
          </Col>
          <Col>
            <Form.Item name="avatar">
              <OSSImageUpload label="更改头像" />
            </Form.Item>
          </Col>
        </Row>
      </ProForm>
    </div>
  );
};
