import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { FlxSpinInstance } from '@/hooks/useSpin';
import router from '../router';

// 获取 storage 对象
const storage = useStorage();

export default class Axios {
  // axios 实例
  private instance: AxiosInstance;
  // loading 对象
  private flxSpin: FlxSpinInstance | undefined = undefined;
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
        // 如果 loading 对象不存在且开启了 loading, 则创建一个 loading 对象
        if (!this.flxSpin && this.options.spin) {
          this.flxSpin = useSpin();
        }
        // 获取 token
        const token = storage.get(CacheKey.TOKEN_NAME);
        // 开启 token 认证;
        this.config.useTokenAuthorization && token && (config.headers.Authorization = token);
        // 设置 accept
        config.headers.Accept = 'application/json';
        // 添加自定义头部
        config.headers['flx-header'] = this.config.customHeader;
        return config;
      },
      (error: any) => Promise.reject(error),
    );
  }

  /**
   * 响应拦截器
   */
  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 如果 loading 对象存在, 则关闭 loading 对象
        if (this.flxSpin) {
          this.flxSpin.close();
          this.flxSpin = undefined;
        }
        // 判断 response 是否携带有 refresh_token
        if (!!response.headers['refresh-token']) storage.set(CacheKey.TOKEN_NAME, response.headers['refresh-token']);
        // 判断是否展示提示消息
        if (response.data?.message && this.options.message) {
          window.$message[response.data.code === 200 ? 'success' : 'error'](response.data.message);
        }
        return response;
      },
      async (error: AxiosError) => {
        if (this.flxSpin) {
          this.flxSpin.close();
          this.flxSpin = undefined;
        }
        this.options = { spin: true, message: true };
        const { response: { status, data, headers } = {} as AxiosResponse } = error;
        const { message } = data;

        // 判断 response 是否携带有 refresh_token
        if (!!headers['refresh-token']) storage.set(CacheKey.TOKEN_NAME, headers['refresh-token']);

        switch (status) {
          case HttpStatus.UNAUTHORIZED:
            storage.remove(CacheKey.TOKEN_NAME);
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
