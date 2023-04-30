import { Button, message, Input, Card, Modal } from 'antd';
import * as ls from 'local-storage';
import PubSub from 'pubsub-js';
import { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import showImage from '@/assets/images/chartRoom/chatShowV2.0.png';
import rootImage from '@/assets/images/chartRoom/root.png';
import { bus } from '@/constant/bus.js';
import insService from '@/service/websocket';
import { RootState } from '@/store/storeTypes';
import './index.scss';
interface Item {
  name: string;
  image: string;
  text: string;
}

const img_url = process.env.REACT_APP_IMG_URL;

const ChatRoom = () => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalImage, setIsModalImage] = useState(false);
  const inputRef = useRef<any>(null);
  const userName = useMemo(() => ls.get<UserInfo>('userInfo').userName, []);
  const { fileName } = useSelector((state: RootState) => state.file);
  const [connectFlag, setConnectFlag] = useState(false);
  const [closeFlag, setCloseFlag] = useState(true);
  const [latestMessage, setLatestMessage] = useState();
  const infoListRef = useRef(null);

  useEffect(() => {
    PubSub.subscribe(bus.updateWs, (_: any, data: any) => {
      setLatestMessage(data);
    });
    return () => {
      PubSub.unsubscribe(bus.updateWs);
    };
  }, []);

  useEffect(() => {
    if (latestMessage) {
      setMessageHistory((prev) => prev.concat(latestMessage));
    }
  }, [latestMessage]);

  const _closeCallBack = useCallback(() => {
    setMessageHistory([]);
  }, []);

  const connect = useCallback(() => {
    let user = {
      type: 'setName',
      name: userName,
      image: `${img_url}${fileName}`,
    };
    insService.joinMeeting({
      params: user,
      closeCallBack: _closeCallBack,
    });
    setConnectFlag(true);
    setCloseFlag(false);
  }, [userName, fileName, _closeCallBack]);

  const close = useCallback(() => {
    insService.close({
      type: 'close',
    });
    setConnectFlag(false);
    setCloseFlag(true);
  }, []);

  const send = useCallback(() => {
    if (!connectFlag) {
      message.error('请先连接');
      return;
    }
    if (inputRef.current!.state.value === '') return;
    insService.sendMessage({
      type: 'chat',
      text: inputRef.current.state.value,
    });
    inputRef.current.state.value = '';
  }, [connectFlag]);

  return (
    <section>
      <Card hoverable>
        <Header>
          <Button type="primary" onClick={connect} disabled={connectFlag}>
            📞 连接
          </Button>
          <Button type="primary" onClick={close} disabled={closeFlag}>
            ❌ 关闭
          </Button>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            使用说明
          </Button>
          <Button type="primary" onClick={() => setIsModalImage(true)}>
            查看效果图
          </Button>
        </Header>

        <div className="chat">
          <div className="chat-content" ref={infoListRef}>
            <div>
              {messageHistory.length > 0 &&
                messageHistory.map((item: Item, index) => (
                  <dl key={index} className={item.name === userName ? 'info-right' : 'info-left'}>
                    <dt>
                      {item.image ? (
                        <img src={item.image} className="headPortrait" alt="图片加载失败" />
                      ) : (
                        <img src={rootImage} className="headPortrait" alt="加载失败" />
                      )}
                    </dt>
                    <dd>
                      <div className="txt-name">{item.name}</div>
                      <div>
                        <span className="txt-content">{item.text}</span>
                      </div>
                    </dd>
                  </dl>
                ))}
            </div>
          </div>
          <div className="chart-button">
            <Input placeholder="请输入" ref={inputRef} onPressEnter={send} />
            <Button type="primary" onClick={send}>
              发送
            </Button>
          </div>
        </div>
      </Card>
      <Modal title="使用说明" visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
        <div>1.点击连接；</div>
        <div>2.使用另一个浏览器，登录另一个账户，点击连接；或者使用另一台电脑登录另一个账户</div>
        <div>3.输入消息，点击发送或者回车发送；</div>
      </Modal>
      <Modal
        title="效果图"
        wrapClassName="app-img-modal"
        visible={isModalImage}
        footer={null}
        onCancel={() => setIsModalImage(false)}
        width="90%"
      >
        <img src={showImage} alt="加载失败" className="pic" />
      </Modal>
    </section>
  );
};

export default ChatRoom;

export const Header = styled.div`
  margin-bottom: 20px;
  .ant-btn {
    margin-right: 10px;
  }
`;
