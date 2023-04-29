import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/reset.css';
import './assets/icon/iconfont.css';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import routeConfig from './config/routeConfig.js';
import renderRoutes from './routes/renderRoutes';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>{renderRoutes(routeConfig)}</BrowserRouter>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
