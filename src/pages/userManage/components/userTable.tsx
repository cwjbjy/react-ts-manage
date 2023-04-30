import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Image, Button, Popconfirm } from 'antd';
import { memo, useCallback, useMemo } from 'react';
import type { RowItem } from '@/apis/model/userModel';

interface Modal {
  isModalVisible: boolean;
  info: RowItem;
}

interface Props {
  tableData: RowItem[];
  onModal({ isModalVisible, info }: Modal): void;
  onDelete(value: RowItem): void;
}

const img_url = process.env.REACT_APP_IMG_URL;

const UserTable: React.FC<Props> = ({ tableData, onModal, onDelete }) => {
  const onEdit = useCallback(
    (params: RowItem) => {
      onModal({
        isModalVisible: true,
        info: params,
      });
    },
    [onModal],
  );

  const columns: ObjectItem[] = useMemo(
    () => [
      {
        title: '用户名',
        dataIndex: 'user_name',
        align: 'center',
      },
      {
        title: '单击图像可以放大',
        dataIndex: 'photo',
        align: 'center',
        render: (text: string) => <Image width={40} src={`${img_url}${text}`} />,
      },
      {
        title: '角色描述',
        dataIndex: 'authority',
        align: 'center',
        render: (text: number) => (
          <span className={text === 1 ? 'blue' : ''}>{text === 1 ? '管理员' : '普通用户'}</span>
        ),
      },
      {
        title: '注册时间',
        dataIndex: 'createTime',
        align: 'center',
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (_: string, record: RowItem) => (
          <>
            {record.authority === '1' ? (
              <Button type="text" className="blue" icon={<EditOutlined />} onClick={() => onEdit(record)}>
                编辑
              </Button>
            ) : (
              <Popconfirm title="确认删除?" onConfirm={() => onDelete(record)} okText="Yes" cancelText="No">
                <Button type="text" className="red" icon={<DeleteOutlined />}>
                  删除
                </Button>
              </Popconfirm>
            )}
          </>
        ),
      },
    ],
    [onDelete, onEdit],
  );

  return <Table bordered columns={columns} dataSource={tableData} style={{ marginTop: 10 }} />;
};

export default memo(UserTable);
