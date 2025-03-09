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

  return { handleAxiosError };
};
