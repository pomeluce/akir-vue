import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios';
import { AkirSpinInstance } from '@/hooks/types';
import router from '../router';

// 获取 storage 对象
const storage = useStorage();

export default class Axios {
  // axios 实例
  private instance: AxiosInstance;
  // loading 对象
  private akirSpin: AkirSpinInstance | undefined = undefined;
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
  public request = async <T,>(config: AxiosRequestConfig, options?: AxiosOptions): Promise<T> => {
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
        if (!this.akirSpin && this.options.spin) this.akirSpin = useSpin();

        const token = storage.get(CacheKey.ACCESS_TOKEN) as string;

        this.config.useTokenAuthorization && token && (config.headers[HttpHeader.AUTHORIZATION] = token);
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
      const result = {} as AxiosResponseHeaders;
      Object.keys(headers).map(key => (result[key.toLowerCase()] = headers[key]));
      if (!!result[HttpHeader['REFRESH-TOKEN'].toLowerCase()]) storage.set(CacheKey.ACCESS_TOKEN, result[HttpHeader['REFRESH-TOKEN'].toLowerCase()]);
    };

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (this.akirSpin) {
          this.akirSpin.close();
          this.akirSpin = undefined;
        }

        setRefreshToken(response.headers);

        if (response.data?.message && this.options.message) {
          window.$message[response.data.code === HttpEntityCode.SUCCESS ? 'success' : 'error'](response.data.message);
        }

        return response;
      },
      async (error: AxiosError) => {
        if (this.akirSpin) {
          this.akirSpin.close();
          this.akirSpin = undefined;
        }
        this.options = { spin: true, message: true };
        const { response: { status, data, headers } = {} as AxiosResponse } = error;
        const { message } = data ?? {};

        setRefreshToken(headers);

        switch (status) {
          case HttpStatus.UNAUTHORIZED:
            storage.remove(CacheKey.ACCESS_TOKEN);
            router.push({ name: RouteName.LOGIN });
            break;
          case HttpStatus.UNPROCESSABLE_ENTITY:
            // useErrorStore().setErrors(error.response.data.errors);
            break;
          case HttpStatus.FORBIDDEN:
            window.$message.error(message ?? '没有操作权限');
            break;
          case HttpStatus.NOT_FOUND:
            window.$message.error(message ?? '请求资源不存在');
            break;
          case HttpStatus.TOO_MANY_REQUESTS:
            window.$message.error(message ?? '请求过于频繁，请稍候再试');
            break;
          default:
            if (message) {
              window.$message.error(message ?? '服务器错误');
            }
        }
        return Promise.reject(error);
      },
    );
  }
}
