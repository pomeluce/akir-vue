/* 请求结果模型 */
interface ResponseModel<T, P = {}> {
  code: number;
  message: string;
  data: T;
  body: P;
}
