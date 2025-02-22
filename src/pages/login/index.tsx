import { useCallback, useEffect, useRef, useState } from 'react';

import { useLocalStorageState, useTitle } from 'ahooks';
import cn from 'classnames';
import styled from 'styled-components';

import { ls } from '@/utils/storage';

import { ACCESS_TOKEN, USER_MENU } from '@/settings/localStorage';
import { USER_INFO } from '@/settings/localStorage';
import type { UserInfo } from '@/types';

import LoginForm from './components/login';
import RegisterForm from './components/register';
import LoginOther from './components/third';

interface ForwardObject {
  login: (params: UserInfo) => void;
}

const Login = () => {
  useTitle('登录');

  const [userInfo, setUser] = useLocalStorageState<any>(USER_INFO, {
    defaultValue: { userName: '一叶扁舟', password: '123456zx' },
  });

  const [flag, setFlag] = useState(true);
  const loginRef = useRef<ForwardObject>();

  useEffect(() => {
    ls.remove(ACCESS_TOKEN); //清除token
    ls.remove(USER_MENU); //清除菜单栏
  }, []);

  const onTab = useCallback(() => {
    setFlag((prev) => !prev);
  }, []);

  const onRegister = useCallback((params: UserInfo) => {
    loginRef.current?.login({
      userName: params.userName,
      password: params.password,
    });
  }, []);

  return (
    <Container>
      <Header>PC端管理系统(React版)</Header>
      <Main>
        <Form>
          <div className="tab">
            <div className={cn({ title_active: flag }, 'tab_title')} onClick={onTab}>
              用户登录
            </div>
            <div className={cn({ title_active: !flag }, 'tab_title')} onClick={onTab}>
              用户注册
            </div>
          </div>
          <div style={{ display: flag ? '' : 'none' }}>
            <LoginForm userInfo={userInfo} setUser={setUser} ref={loginRef}></LoginForm>
            <LoginOther></LoginOther>
          </div>
          <div style={{ display: !flag ? '' : 'none' }}>
            <RegisterForm setUser={setUser} onRegister={onRegister}></RegisterForm>
          </div>
        </Form>
      </Main>
    </Container>
  );
};

export default Login;

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  background: rgba(25, 202, 173, 1);
  /* 解决谷歌记住密码后的默认样式 */
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
    -webkit-text-fill-color: rgba(0, 0, 0, 0.85); /*字体颜色*/
  }
`;

export const Header = styled.header`
  font-size: 50px;
  letter-spacing: 5px;
  height: 20vh;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Main = styled.main`
  width: 100%;
  min-height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.div`
  width: 400px;
  min-height: 370px;
  padding: 30px;
  background: #fff;
  box-shadow: 0 0 80px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  box-sizing: border-box;
  .tab {
    width: 190px;
    height: 40px;
    margin: 0 auto;
    display: flex;
    box-sizing: border-box;
    margin-bottom: 30px;
    .tab_title {
      display: inline-block;
      flex: 1;
      height: 38px;
      line-height: 38px;
      text-align: center;
      font-size: 16px;
      color: #999;
      cursor: pointer;
      &:hover {
        color: #0078dc;
      }
    }
    .title_active {
      color: #0078dc;
      border-bottom: 2px solid #0078dc;
    }
  }
`;
