import { MockMethod } from 'vite-plugin-mock';
import { RequestURL } from '../src/constants/RequestURL';

export default [
  {
    url: '/api/' + RequestURL.LOGIN,
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '登录成功',
        data: 'token',
      };
    },
  },
  {
    url: '/api/' + RequestURL.CAPTCHA,
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '获取验证码成功',
        data: {
          uid: Date.now().toString(),
          image:
            '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',
        },
      };
    },
  },
] as MockMethod[];
