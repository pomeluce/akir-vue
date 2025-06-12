import Axios from './Axios';

const env = import.meta.env;

// 创建 axios 实例
export default new Axios({
  // 请求前缀
  baseURL: env.VITE_API_URL,
  // 请求头设置
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    [HttpHeader.locale]: 'zh_CN',
  },
  // 跨域请求携带 cookie
  withCredentials: true,
  // 开启 token 认证
  useTokenAuthorization: true,
});
