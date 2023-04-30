import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/reset.css';
import './assets/icon/iconfont.css';

import { Provider } from 'react-redux';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { FullScreenLoading } from '@/components/layout/loading';
import router from './router';
import store from './store';

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
