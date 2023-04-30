import { CaretDownOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Dropdown } from 'antd';
import { memo, useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ThemeContext from '../../layout/themeContext';

import API from '@/apis/user';
import { SETFILENAME } from '@/store/file.js';
import type { MenuProps } from 'antd';

import './index.scss';

interface Props {
  userName: string;
}

const items: MenuProps['items'] = [
  {
    key: 'theme-gray',
    label: '简约灰',
  },
  {
    key: 'theme-blue',
    label: '胖次蓝',
  },
  {
    key: 'theme-black',
    label: '夜间模式',
  },
];

const list: MenuProps['items'] = [
  {
    key: '0',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/cwjbjy/react-ts-manage">
        项目仓库
      </a>
    ),
  },
  {
    key: '1',
    label: '退出登录',
  },
];

const img_url = process.env.REACT_APP_IMG_URL;

const Header = ({ userName }: Props) => {
  const { changeTheme } = useContext(ThemeContext);
  const { fileName } = useSelector((state: any) => state.file);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useRequest(() => API.getImage({ user_name: userName }), {
    ready: !!userName,
    onSuccess: (res: any) => {
      dispatch(SETFILENAME(res.data[0].photo));
    },
  });

  const onChangeTheme = useCallback(
    (e: any) => {
      changeTheme(e.key);
    },
    [changeTheme],
  );

  const onUserClick = useCallback(
    (e: any) => {
      if (e.key === '1') {
        navigation('/login');
      }
    },
    [navigation],
  );

  return (
    <header className="header">
      <div className="header_left">
        <span style={{ marginLeft: 10 }}>PC端后台管理系统(React版)</span>
      </div>
      <div className="header_right">
        <Dropdown
          menu={{ items, selectable: true, onClick: onChangeTheme, defaultSelectedKeys: ['theme-gray'] }}
          className="user-drop"
        >
          <i className="iconfont icon-zhuti_tiaosepan_o"></i>
        </Dropdown>
        <Dropdown menu={{ items: list, onClick: onUserClick }} className="user-drop">
          <div className="userImage">
            {fileName && <img src={`${img_url}${fileName}`} className="user-img" alt="加载失败" />}
            <span style={{ marginRight: 5 }}>
              <span style={{ marginRight: 2 }}>{userName}</span>
              <CaretDownOutlined />
            </span>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default memo(Header);
