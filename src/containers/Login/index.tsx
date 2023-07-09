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
import { LOGIN, SEND_PHONE_CAPTCHA } from '@/graphql/auth';
import { AUTH_TOKEN } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/hooks/userHooks';
import styles from './index.module.less';

interface IValue {
  phoneNumber: string;
  code: string;
  autoLogin: boolean;
}

export default () => {
  const [run] = useMutation(SEND_PHONE_CAPTCHA);
  const [login] = useMutation(LOGIN);
  const { store } = useUserContext();
  const nav = useNavigate();

  const loginHandler = async (values: IValue) => {
    // 调用登录API，返回API的响应信息
    const res = await login({ variables: values });
    if (res.data.login.code === 200) {
      store.refetchHandler();
      message.success(res.data.login.message);
      // 如果勾选了自动登录，就存储token至localStorage
      if (values.autoLogin) {
        localStorage.setItem(AUTH_TOKEN, res.data.login.data);
      }
      // 登录完成跳转
      nav('/');
    } else {
      message.error(res.data.login.message);
    }
  };
  return (
    <div className={styles.container}>
      <LoginFormPage
        onFinish={loginHandler}
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
          name="code"
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
