import { useTitle } from 'ahooks';
import { FloatButton } from 'antd';
import { get } from 'local-storage';
import * as ls from 'local-storage';
import { useMemo, useRef } from 'react';

import Header from '../components/header/index';
import { menus } from '../components/menus/config';
import Menus from '../components/menus/index';
import FullScreenLoading from '@/components/layout/loading';
import Global from '../global/index';
import { Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { ACCESS_TOKEN } from '@/config/constant';

import './index.scss';

const AppHome = () => {
  useTitle('react管理系统');
  const overFlowRef = useRef(null);

  const { theme } = useAppSelector((state) => state.theme);
  const userName = useMemo(() => get<UserInfo>('userInfo').userName, []);

  const newMenus = useMemo(() => {
    let authMenus = get<string[]>('menu');
    return menus.filter((item) => authMenus && authMenus.includes(item.key.split('/')[1]));
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
