import { useRequest } from 'ahooks';
import { Row, Col, Card } from 'antd';
import { get } from 'local-storage';
import { useContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import ThemeContext from '../../layout/themeContext';
import Bar from './components/bar';
import BarLine from './components/barLine';
import Message from './components/message';
import ProgressCard from './components/progressCard';
import Schedule from './components/schedule';
import UserCard from './components/userCard';

import API from '@/apis/user';
import { USER_INFO } from '@/config/constant.js';
import { RootState } from '@/store/storeTypes';
import './index.scss';

const barModel = {
  xAxis: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  series: [120, 200, 150, 80, 70, 110],
};

const HomePage = () => {
  const { fileName } = useSelector((state: RootState) => state.file);

  const { theme } = useContext(ThemeContext);

  const [createTime, setCreateTime] = useState('');

  const userName = useMemo(() => get<UserInfo>(USER_INFO).userName, []);

  useRequest(
    () =>
      API.getUser({
        user_name: userName,
      }),
    {
      onSuccess: (res: Record<string, any>) => {
        setCreateTime(res.data[0].createTime);
      },
    },
  );

  return (
    <section style={{ paddingLeft: 20 }}>
      <div className="row1">
        <Wrapper>
          <UserCard fileName={fileName} userName={userName} registerTime={createTime} />
          <ProgressCard />
        </Wrapper>
        <div style={{ marginLeft: 20, flex: 1 }}>
          <Message />
          <div className="Schedule">
            <Schedule />
          </div>
        </div>
      </div>
      <Row style={{ marginBottom: 10 }}>
        <Col span={12} lg={12} xl={12} className="echarts-box">
          <Card hoverable>
            <Bar theme={theme} model={barModel} />
          </Card>
        </Col>
        <Col span={12} lg={12} xl={12} className="echarts-box">
          <Card hoverable>
            <BarLine theme={theme} />
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default HomePage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
