import { Menu } from 'antd';
import { memo, useEffect, useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { MenusTypes } from './config';
import './index.scss';

interface Props {
  menus: MenusTypes[];
}

const rootSubmenuKeys = ['drag', 'flowChart'];

const Menus = ({ menus }: Props) => {
  const location = useLocation();
  const navigation = useNavigate();

  const [selectedKey, setselectedKeys] = useState(['']);

  useEffect(() => {
    setselectedKeys([location.pathname]);
  }, [location]);

  const [openKeys, setOpenKeys] = useState<any[]>([]);

  const onOpenChange = (keys: any[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onClick = useCallback(
    (e: any) => {
      navigation(e.key);
    },
    [navigation],
  );

  return (
    <Menu
      style={{ width: 256 }}
      selectedKeys={selectedKey}
      openKeys={openKeys}
      mode="inline"
      className="Menu"
      items={menus}
      onOpenChange={onOpenChange}
      onClick={onClick}
    ></Menu>
  );
};

export default memo(Menus);
