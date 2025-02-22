import { Dispatch, useCallback, useEffect, useState, memo } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Form, Input, message } from 'antd';
import CryptoJS from 'crypto-es';

import { getTime } from '@/utils/share';

import { register } from '@/apis/user';

import { CODE_EXIST } from '@/settings/code';
import type { UserInfo } from '@/types';

import { FormButton } from './login';

interface Props {
  setUser: Dispatch<React.SetStateAction<UserInfo>>;
  onRegister: (params: UserInfo) => void;
}

const icon = {
  color: '#c0c4cc',
};

const RegisterForm = ({ setUser, onRegister }: Props) => {
  const [verifyCode, set_verifyCode] = useState<{ validate: (params: string) => boolean }>();
  const [userInfo, setUserInfo] = useState({ userName: '', password: '' });

  const { run } = useRequest(register, {
    manual: true,
    onSuccess: (data, params) => {
      setUser(userInfo);
      message.success({
        content: data.msg,
        className: 'custom-message',
      });
      onRegister({
        userName: params[0].userName,
        password: params[0].password,
      });
    },
    onError: (error: Record<string, any>) => {
      if (error.status === CODE_EXIST) {
        message.error({
          content: '用户名已存在，请重新选择用户名',
          className: 'custom-message',
        });
      }
    },
  });

  useEffect(() => {
    set_verifyCode(new window.GVerify('v_container'));
  }, []);

  const onFinish = useCallback(
    (params: { authCode: string; reg_name: string; rge_pass: string }) => {
      if (params.authCode && verifyCode?.validate(params.authCode)) {
        const user = {
          userName: params.reg_name,
          password: CryptoJS.MD5(params.rge_pass).toString(),
          authority: 2,
          createTime: getTime(),
          photo: 'userlogo.png',
        };
        setUserInfo({ userName: params.reg_name, password: params.rge_pass });
        run(user);
      } else {
        message.error({
          content: '验证码错误',
          className: 'custom-message',
        });
      }
    },
    [run, verifyCode],
  );

  return (
    <Form name="register" size="large" onFinish={onFinish}>
      <Form.Item
        name="reg_name"
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      >
        <Input placeholder="请输入用户名" prefix={<UserOutlined style={{ color: icon.color }} />} />
      </Form.Item>

      <Form.Item
        name="rge_pass"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
            message: '请输入8-16位由数字与字母组成的密码',
          },
        ]}
      >
        <Input.Password
          placeholder="请输入8-16位由数字与字母组成的密码"
          prefix={<LockOutlined style={{ color: icon.color }} />}
        />
      </Form.Item>

      <Form.Item
        name="rge_passAgain"
        rules={[
          {
            required: true,
            message: '请再次输入密码!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('rge_pass') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次密码不一致!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="请再次输入密码" prefix={<LockOutlined style={{ color: icon.color }} />} />
      </Form.Item>

      <Form.Item name="authCode">
        <div style={{ display: 'flex' }}>
          <Input placeholder="验证码区分大小写" />
          <div id="v_container" style={{ width: 200, height: 40, marginLeft: 10 }}></div>
        </div>
      </Form.Item>

      <Form.Item>
        <FormButton type="primary" htmlType="submit">
          注册
        </FormButton>
      </Form.Item>
    </Form>
  );
};

export default memo(RegisterForm);
