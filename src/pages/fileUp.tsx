import { useState, useMemo, useCallback } from 'react';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Upload, message, Card } from 'antd';
import * as ls from 'local-storage';
import styled from 'styled-components';

import { getImage } from '@/apis/user';

import type { UserInfo } from '@/types';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

import { ACCESS_TOKEN } from '@/settings/localStorage';
import { USER_INFO } from '@/settings/localStorage';
import { setFileName } from '@/store/file';
import { useAppSelector, useAppDispatch } from '@/store/hooks';

const baseURL = process.env.REACT_APP_AUTH_URL;
const img_url = process.env.REACT_APP_IMG_URL;

const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const FileUp = () => {
  const { fileName } = useAppSelector((state) => state.file);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const userName = useMemo(() => ls.get<UserInfo>(USER_INFO).userName, []);
  const { run } = useRequest(getImage, {
    manual: true,
    onSuccess: (res) => {
      dispatch(setFileName(res.data[0].photo));
    },
  });

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = useCallback(
    (info: UploadChangeParam<UploadFile>) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        run({ user_name: userName });
        setLoading(false);
      }
    },
    [run, userName],
  );

  return (
    <Wrapper>
      <Card hoverable>
        <p style={{ marginBottom: 20 }}>
          <strong>上传头像功能，上传完可点击首页观看效果</strong>
        </p>
        <Upload
          name="file"
          data={{ user_name: userName }}
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={`${baseURL}/uploadImage`}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          headers={{ authorization: `Bearer ${ls.get(ACCESS_TOKEN)}` }}
        >
          {fileName ? <img src={`${img_url}${fileName}`} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <p className="ant-upload-hint">只能上传jpg/png文件，且不超过2MB</p>
      </Card>
    </Wrapper>
  );
};

export default FileUp;

const Wrapper = styled.div`
  padding: 10px;
  .avatar-uploader > .ant-upload {
    width: 178px;
    height: 178px;
  }
`;
