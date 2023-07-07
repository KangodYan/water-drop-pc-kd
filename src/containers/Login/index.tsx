import {
  LockOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import { useMutation } from '@apollo/client';
import { SEND_PHONE_CAPTCHA } from '@/graphql/auth';
import styles from './index.module.less';

export default () => {
  const [run] = useMutation(SEND_PHONE_CAPTCHA);
  return (
    <div className={styles.container}>
      <LoginFormPage
        initialValues={{ phoneNumber: '' }}
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="https://water-drop-resources.oss-cn-chengdu.aliyuncs.com/images/henglogo%402x.png"
      >
        <Tabs centered>
          <Tabs.TabPane key="phone" tab="手机号登录" />
        </Tabs>
        <ProFormText
          fieldProps={{
            size: 'large',
            prefix: <MobileOutlined className="prefixIcon" />,
          }}
          name="phoneNumber"
          placeholder="手机号"
          rules={[
            {
              required: true,
              message: '请输入手机号！',
            },
            {
              pattern: /^1\d{10}$/,
              message: '手机号格式错误！',
            },
          ]}
        />
        <ProFormCaptcha
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className="prefixIcon" />,
          }}
          captchaProps={{
            size: 'large',
          }}
          placeholder="请输入验证码"
          captchaTextRender={(timing, count) => {
            if (timing) {
              return `${count} ${'获取验证码'}`;
            }
            return '获取验证码';
          }}
          phoneName="phoneNumber"
          name="captcha"
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
          onGetCaptcha={async (phoneNumber: string) => {
            const res = await run({
              variables: {
                phoneNumber,
              },
            });
            if (res.data.sendCodeMsg.code === 200) {
              message.success(res.data.sendCodeMsg.message);
            } else {
              message.error(res.data.sendCodeMsg.message);
            }
          }}
        />
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
        </div>
      </LoginFormPage>
    </div>
  );
};
