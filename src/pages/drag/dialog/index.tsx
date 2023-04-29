import { Modal, Card, Button } from 'antd';
import React, { useState } from 'react';

import Toast from './components/index';
import './index.scss';

const DragModel = () => {
  const [visible, onVisible] = useState(false);

  return (
    <section>
      <Card hoverable title={<strong>点击按钮，鼠标移动到弹框处，可实现拖拽功能。</strong>}>
        <Button type="primary" size="large" onClick={() => onVisible(true)}>
          点我弹框
        </Button>
        <Modal onCancel={() => onVisible(false)} onOk={() => onVisible(false)} title="拖拽弹框" visible={visible}>
          <Toast></Toast>
        </Modal>
      </Card>
    </section>
  );
};

export default React.memo(DragModel);
