import { useMemo, useRef } from 'react';
import { Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { useTitle } from 'ahooks';
import { FloatButton } from 'antd';
import { get } from 'local-storage';
import * as ls from 'local-storage';

import FullScreenLoading from '@/components/layout/loading';

import Header from '../components/header/index';
import { menus } from '../components/menus/config';
import Menus from '../components/menus/index';
import Global from '../global/index';

import { ACCESS_TOKEN } from '@/config/constant';
import { useAppSelector } from '@/store/hooks';

import './index.scss';

const AppHome = () => {
  useTitle('react管理系统');
  const overFlowRef = useRef(null);

  const { theme } = useAppSelector((state) => state.theme);
  const userName = useMemo(() => get<UserInfo>('userInfo')?.userName, []);

  const newMenus = useMemo(() => {
    let authMenus = get<string[]>('menu');
    return menus.filter((item) => {
      if (authMenus) {
        if (item && item.key) {
          return authMenus.includes((item.key as string).split('/')[1]);
        }
      }
      return [];
    });
  }, []);

  if (!ls.get(ACCESS_TOKEN)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <FloatButton.BackTop visibilityHeight={100} target={() => overFlowRef.current!} />
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
      <Global />
    </>
  );
};

export default AppHome;
