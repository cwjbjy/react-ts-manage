import 'antd/dist/reset.css';
import './assets/icon/iconfont.css';

import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { TYPES, init } from 'cwj_monitoring';
import ReactDOM from 'react-dom/client';

import FullScreenLoading from '@/components/layout/loading';

import reportWebVitals from './reportWebVitals';
import router from './router';
import store from './store';
import './utils/observer';

//自己的npm包，数据埋点
init({
  url: `${process.env.REACT_APP_AUTH_URL}/track`, //必传参数，数据上传服务器地址
  plugin: [TYPES.ROUTER], //监听路由
  data: {
    vs: 'react-manage',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <Suspense fallback={<FullScreenLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
