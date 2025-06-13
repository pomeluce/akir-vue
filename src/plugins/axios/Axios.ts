import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios';
import emitter from '../emitter';

// 获取 storage 对象
const storage = useStorage();

export default class Axios {
  // axios 实例
  private instance: AxiosInstance;
  // 参数对象
  private options: AxiosOptions = { spin: true, message: true };
  // axios 参数配置
  private config: AxiosRequestConfig & AxiosConfig;

  /**
   * 构造函数, 初始化 axios 实例
   *
   * @param defaults axios 配置
   */
  constructor(defaults: AxiosRequestConfig & AxiosConfig) {
    this.instance = axios.create(defaults);
    this.config = defaults;
    this.initInterceptors();
  }

  /**
   * 加载拦截器
   */
  private initInterceptors() {
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  /**
   * 请求发送方法
   *
   * @param config 请求参数
   * @param options 加载及消息配置
   */
  public request = async <T>(config: AxiosRequestConfig, options?: AxiosOptions): Promise<T> => {
    this.options = { spin: true, message: true };
    // 合并配置
    this.options = Object.assign(this.options, options ?? {});
    // 发送请求
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<T>(config);
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    }) as Promise<T>;
  };

  /**
   * 请求拦截器
   */
  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (this.options.spin) emitter.emit('SPIN:OPEN');
        // this.akirSpin = useSpin();
        const token = storage.get(CacheKey.ACCESS_TOKEN) as string;
        this.config.useTokenAuthorization && token && (config.headers[HttpHeader.authorization] = token);
        return config;
      },
      (error: any) => Promise.reject(error),
    );
  }

  /**
   * 响应拦截器
   */
  private interceptorsResponse() {
    const setRefreshToken = (headers: AxiosResponse['headers']) => {
      if (!headers) return;
      const result = {} as AxiosResponseHeaders;
      Object.keys(headers).map(key => (result[key.toLowerCase()] = headers[key]));
      if (!!result[HttpHeader.refreshToken]?.toLowerCase()) storage.set(CacheKey.ACCESS_TOKEN, result[HttpHeader.refreshToken].toLowerCase());
    };

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        emitter.emit('SPIN:CLOSE');

        setRefreshToken(response.headers);

        if (response.data?.message && this.options.message) {
          emitter.emit('MESSAGE:API:DEFAULT', { content: response.data.message, options: { type: response.data.code === HttpEntityCode.SUCCESS ? 'success' : 'error' } });
        }

        return response;
      },
      async (error: AxiosError) => {
        emitter.emit('SPIN:CLOSE');

        this.options = { spin: true, message: true };
        const { response: { status, data, headers } = {} as AxiosResponse } = error;
        const { message } = data ?? {};

        setRefreshToken(headers);

        switch (status) {
          case HttpStatus.UNAUTHORIZED:
            emitter.emit('ROUTER:API:UNAUTHORIZED');
            break;
          case HttpStatus.UNPROCESSABLE_ENTITY:
            // useErrorStore().setErrors(error.response.data.errors);
            break;
          case HttpStatus.FORBIDDEN:
            emitter.emit('MESSAGE:API:FORBIDDEN', { content: message ?? '没有操作权限', options: { type: 'error' } });
            break;
          case HttpStatus.NOT_FOUND:
            emitter.emit('MESSAGE:API:NOT_FOUND', { content: message ?? '请求资源不存在', options: { type: 'error' } });
            break;
          case HttpStatus.TOO_MANY_REQUESTS:
            emitter.emit('MESSAGE:API:TOO_MANY_REQUESTS', { content: message ?? '请求过于频繁, 请稍候再试', options: { type: 'error' } });
            break;
          default:
            emitter.emit('MESSAGE:API:INTERNAL_SERVER_ERROR', { content: message ?? '服务器错误', options: { type: 'error' } });
        }
        return Promise.reject(error);
      },
    );
  }
}
