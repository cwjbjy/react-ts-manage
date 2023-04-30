import { useRequest } from 'ahooks';
import { Card, Modal, message, Spin } from 'antd';
import * as ls from 'local-storage';
import { useCallback, useState, useMemo } from 'react';

import PassChange from './components/passChange';
import UserTable from './components/userTable';

import { user, updateUser, deleteUser } from '@/apis/user';
import type { RowItem } from '@/apis/model/userModel';
import { USER_INFO } from '@/config/constant.js';
import './index.scss';

interface Info {
  id: number;
  user_name: string;
}

const setData = (data: RowItem[]) => {
  let newArr: RowItem[] = [];
  data.forEach((item: RowItem, index: number) => {
    let newItem = Object.assign({}, item, { key: index });
    newArr.push(newItem);
  });
  return newArr;
};

const UserManage = () => {
  const [info, setInfo] = useState<Info>({} as Info);
  const [isModalVisible, setModal] = useState(false);
  const [password, setPassword] = useState('');
  const [tableData, setTableData] = useState<RowItem[]>([]);
  const userName = useMemo(() => ls.get<UserInfo>('userInfo').userName, []);

  const onModal = useCallback(({ isModalVisible, info }: { isModalVisible: boolean; info: Info }) => {
    setModal(isModalVisible);
    setInfo(info);
  }, []);

  const { run, loading } = useRequest(user, {
    onSuccess: (res) => {
      setTableData(setData(res.data.data));
    },
  });

  const { run: handleUpdate } = useRequest(updateUser, {
    manual: true,
    onSuccess: (data, params) => {
      message.success({
        content: '密码修改成功',
      });
      ls.set(USER_INFO, {
        userName: params[0].user_name,
        passWord: params[0].password,
        flag: true,
      });
    },
  });

  const { run: handleDeleteUser } = useRequest(deleteUser, {
    manual: true,
    onSuccess: () => {
      message.success({
        content: '删除成功',
      });
      run();
    },
  });

  const onDelete = useCallback(
    (value: RowItem) => {
      let { id } = value;
      handleDeleteUser({ id });
    },
    [handleDeleteUser],
  );

  const handleOk = useCallback(() => {
    let { id, user_name } = info;
    const params = {
      id,
      user_name,
      password,
    };
    handleUpdate(params);
    setModal(false);
  }, [handleUpdate, info, password]);

  const getPass = useCallback((val: string) => setPassword(val), []);

  if (userName !== '一叶扁舟') return <>管理员账户方可查看</>;
  return (
    <section>
      {loading ? (
        <Spin />
      ) : (
        <>
          <Card hoverable>
            <strong>管理员可修改密码，普通用户可删除</strong>
            <UserTable tableData={tableData} onModal={onModal} onDelete={onDelete} />
          </Card>
          <Modal title="修改密码" open={isModalVisible} onOk={handleOk} onCancel={() => setModal(false)}>
            <PassChange getPass={getPass} />
          </Modal>
        </>
      )}
    </section>
  );
};

export default UserManage;
