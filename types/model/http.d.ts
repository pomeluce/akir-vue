/* 请求结果模型 */
interface ResponseModel<T> {
  code: string;
  message: string;
  data: T;
}
