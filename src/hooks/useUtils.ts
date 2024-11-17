import { AxiosError } from 'axios';

export default () => {
  /**
   * axios 请求异常处理
   * @param error - 请求异常对象
   */
  const handleAxiosError = (error: AxiosError) => {
    const { request, message } = error;
    console.error(`Interface Access Failed: ${message}, ${request?.status} ${request?.statusText}: ${request?.responseURL}`);
  };

  /**
   * 判断当前对象是否为 Promise 函数
   *
   * @param value - 带判断的对象
   * @returns 返回一个 boolean 类型的判断结果
   */
  const isPromise = (value: any) => {
    return value !== null && typeof value === 'object' && typeof value.then === 'function';
  };

  /**
   * 路由跳转函数
   *
   * @param route - 路由对象
   * @param target - 跳转方式, 默认为 _self
   */
  const open = (to: string, target: string = '_self') => {
    target === '_blank' ? window.open(to) : (location.href = to);
  };

  return { handleAxiosError, isPromise, open };
};
