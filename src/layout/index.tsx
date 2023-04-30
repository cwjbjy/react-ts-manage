import { useTitle } from 'ahooks';
import { BackTop } from 'antd';
import { get } from 'local-storage';
import * as ls from 'local-storage';
import { useState, useCallback, useMemo, useRef } from 'react';

import Header from '../components/header/index';
import { menus } from '../components/menus/config';
import Menus from '../components/menus/index';
import { FullScreenLoading } from '@/components/layout/loading';
import Global from '../global/index';
import { Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import ThemeContext from './themeContext';
import { ACCESS_TOKEN } from '@/config/constant';

import './index.scss';

enum ThemeColor {
  GRAY = 'theme-gray',
  BLUE = 'theme-blue',
  BLACK = 'theme-black',
}

const AppHome = () => {
  useTitle('react管理系统');
  const overFlowRef = useRef(null);

  const [theme, setTheme] = useState(ThemeColor.GRAY);

  const userName = useMemo(() => get<UserInfo>('userInfo').userName, []);

  const newMenus = useMemo(() => {
    let authMenus = get<string[]>('menu');
    return menus.filter((item) => authMenus && authMenus.includes(item.key));
  }, []);

  const changeTheme = useCallback((color: any) => {
    setTheme(color);
  }, []);

  if (!ls.get(ACCESS_TOKEN)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <BackTop visibilityHeight={100} target={() => overFlowRef.current!} />
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        <div className={theme}>
          <Header userName={userName} />
          <main className="wrapper">
            <aside>
              <Menus menus={newMenus} />
            </aside>
            <article ref={overFlowRef}>
              <Suspense fallback={<FullScreenLoading />}>
                <Outlet />
              </Suspense>
            </article>
          </main>
        </div>
      </ThemeContext.Provider>
      <Global />
    </>
  );
};

export default AppHome;
