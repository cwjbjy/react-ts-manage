import * as ls from 'local-storage';
import qs from 'qs';

import enumAuth from './auth';

import { ACCESS_TOKEN } from '@/config/constant';
import { CODE_TOKEN_EXPIRED } from '@/config/returnCodeMap';

const baseURL = process.env.REACT_APP_AUTH_URL;

class FetchClient {
  constructor() {
    this.headers = {}; //预留字段
    this.token = '';
  }
  /**
   * 请求拦截器
   * 功能：请求配置
   */
  interceptorsRequest(url, { auth, method, data }) {
    let headers = null;
    let conf = {};

    //通过鉴权产出headers
    switch (auth) {
      case enumAuth.Level01: //需要token
        headers = Object.assign({}, this.headers, {
          authorization: `Bearer ${ls.get(ACCESS_TOKEN)}`,
        });
        break;
      case enumAuth.Level02: //不需要token
        headers = Object.assign({}, this.headers);
        break;
      default:
        break;
    }

    if (method === 'GET' || method === 'HEAD' || method === 'DELETE') {
      //fetch对GET请求等，不支持将参数传在body上，只能拼接url (axios可以)
      data = qs.stringify(data, {
        arrayFormat: 'repeat',
      });
      url = `${url}?${data}`;
    } else {
      //非form-data传输JSON数据格式
      if (!['[object FormData]', '[object URLSearchParams]'].includes(Object.prototype.toString.call(data))) {
        Object.assign(headers, { 'Content-Type': 'application/json' });
        data = JSON.stringify(data);
      }
      conf = {
        body: data,
      };
    }
    return {
      url,
      options: Object.assign(
        {},
        {
          method,
          headers,
        },
        conf,
      ),
    };
  }

  /**
   * 响应拦截器
   */
  interceptorsResponse(res) {
    return new Promise((resolve, reject) => {
      if (res.ok) {
        try {
          return resolve(res.json());
        } catch {
          return resolve({
            status: 'ok',
          });
        }
      }
      //token过期错误统一处理
      if (res.status === CODE_TOKEN_EXPIRED) {
        window.location.href = '/login';
      }
      /* 全局处理网络请求异常 */
      // alert("网络错误，请稍后重试");
      /* 通过.catch方式捕获异常*/
      reject(res);
    });
  }

  /**
   * 请求工厂
   */
  async httpFactory(url = '', { data = null, auth = enumAuth.Level01, method }) {
    let req = await this.interceptorsRequest(baseURL + url, {
      auth,
      data,
      method,
    }); //请求拦截
    let res = await fetch(req.url, req.options); //网络请求
    let rst = await this.interceptorsResponse(res);
    return rst;
  }

  async get(url, params) {
    return await this.httpFactory(url, {
      ...params,
      method: 'GET',
    });
  }

  async post(url, params) {
    return await this.httpFactory(url, {
      ...params,
      method: 'POST',
    });
  }

  async put(url, params) {
    return await this.httpFactory(url, {
      ...params,
      method: 'PUT',
    });
  }

  async delete(url, params) {
    return await this.httpFactory(url, {
      ...params,
      method: 'DELETE',
    });
  }

  async patch(url, params) {
    return await this.httpFactory(url, {
      ...params,
      method: 'PATCH',
    });
  }
}

const HttpClient = new FetchClient();

export default HttpClient;
