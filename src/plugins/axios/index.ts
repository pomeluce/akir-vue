import Axios from './Axios';

// 创建 axios 实例
export default new Axios({
  // 请求前缀
  baseURL: '/api',
  // 超时时间
  timeout: 10000,
  // 请求头设置
  headers: {
    AkirLocale: 'zh_CN',
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
  // 跨域请求携带 cookie
  withCredentials: true,
  // 开启 token 认证
  useTokenAuthorization: true,
});
