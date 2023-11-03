import 'antd/dist/reset.css';
import './assets/icon/iconfont.css';

import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { init } from 'cwj_monitoring';
import ReactDOM from 'react-dom/client';

import FullScreenLoading from '@/components/layout/loading';

import reportWebVitals from './reportWebVitals';
import router from './router';
import store from './store';
import './utils/observer';

//自己的npm包，数据埋点
init({
  url: `${process.env.REACT_APP_AUTH_URL}/track`, //必传参数，数据上传服务器地址
  max: 2, //可选参数，最大缓存数，即超过缓存数立即上传，默认为5
  router: true, //可选参数，是否监听路由事件，默认关闭
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
