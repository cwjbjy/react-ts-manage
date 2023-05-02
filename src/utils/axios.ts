import axios from 'axios';
import * as ls from 'local-storage';

import { ACCESS_TOKEN } from '@/config/constant';
/*
 * 创建实例
 * 与后端服务通信
 */
const HttpClient = axios.create({
  baseURL: process.env.REACT_APP_AUTH_URL,
});

/**
 * 请求拦截器
 * 功能：配置请求头，全局配置报错提示
 */
HttpClient.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${ls.get(ACCESS_TOKEN)}`;
    return config;
  },
  (error) => {
    console.error('网络错误，请稍后重试');
    return Promise.reject(error);
  },
);

/**
 * 响应拦截器
 * 功能：处理异常
 */
HttpClient.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default HttpClient;
