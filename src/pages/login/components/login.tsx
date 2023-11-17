import { Dispatch, forwardRef, memo, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRequest, useKeyPress } from 'ahooks';
import { Form, Input, Button } from 'antd';
import CryptoJS from 'crypto-es';
import styled from 'styled-components';

import { ls } from '@/utils/storage';

import { login } from '@/apis/user';

import { CODE_NAME_PASS } from '@/settings/code';
import { USER_MENU, ACCESS_TOKEN } from '@/settings/localStorage';
import type { UserInfo } from '@/types';

interface Props {
  setUser: Dispatch<React.SetStateAction<UserInfo>>;
  userInfo: UserInfo;
}

const icon = {
  color: '#c0c4cc',
};

const LoginForm = forwardRef(({ setUser, userInfo }: Props, ref) => {
  useImperativeHandle(ref, () => ({
    login: (params: { userName: string; passWord: string }) => {
      run(params);
    },
  }));

  const navigation = useNavigate();

  const [form] = Form.useForm();

  const { run, loading } = useRequest(login, {
    manual: true,
    onSuccess: (res, params) => {
      ls.set(ACCESS_TOKEN, res.data.token);
      ls.set(USER_MENU, res.data.auth);
      navigation('/firstItem');
    },
    onError: (error: Record<string, any>) => {
      if (error.status === CODE_NAME_PASS) {
        form.setFields([
          {
            name: 'passWord',
            errors: ['用户名或密码错误'],
          },
        ]);
        form.setFields([
          {
            name: 'userName',
            errors: ['用户名或密码错误'],
          },
        ]);
      }
    },
  });

  const onFinish = (params: UserInfo) => {
    const { userName, passWord } = params;
    setUser(params);
    run({
      userName,
      passWord: CryptoJS.MD5(passWord).toString(),
    });
  };

  useKeyPress('enter', () => {
    form.submit();
  });

  return (
    <Form name="login" initialValues={userInfo} size="large" form={form} onFinish={onFinish}>
      <Form.Item
        name="userName"
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      >
        <Input prefix={<UserOutlined style={{ color: icon.color }} />} />
      </Form.Item>

      <Form.Item
        name="passWord"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined style={{ color: icon.color }} />} />
      </Form.Item>

      <Form.Item>
        <FormButton type="primary" htmlType="submit" loading={loading}>
          登录
        </FormButton>
      </Form.Item>
    </Form>
  );
});

export default memo(LoginForm);

export const FormButton = styled(Button)`
  width: 100%;
`;
