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

  const findDeep = <T,>(arrays: T[], condition: Partial<Record<keyof T, any>>, deepKey: keyof T): T | undefined => {
    for (const item of arrays) {
      const result = Object.entries(condition).every(([key, value]) => item[key as keyof T] === value);
      if (result) return item;
      const deepArray = item[deepKey];
      if (Array.isArray(deepArray)) {
        const result = findDeep(deepArray, condition, deepKey);
        if (result) return result;
      }
    }

    return undefined;
  };

  return { handleAxiosError, isPromise, findDeep };
};
