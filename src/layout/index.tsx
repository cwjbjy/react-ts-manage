import { useTitle } from 'ahooks';
import { BackTop } from 'antd';
import { get } from 'local-storage';
import { useState, useCallback, useMemo, useRef } from 'react';

import Header from '../components/header/index';
import { menus } from '../components/menus/config';
import Menus from '../components/menus/index';
import Global from '../global/index';
import RouterView from '../routes/routerView';
import ThemeContext from './themeContext';

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
              <RouterView />
            </article>
          </main>
        </div>
      </ThemeContext.Provider>
      <Global />
    </>
  );
};

export default AppHome;
