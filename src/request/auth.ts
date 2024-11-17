import { http, router } from '@/plugins';

const { get, set, remove } = useStorage();

/** 登录接口 */
export const login = async (data: LoginFormModel) => {
  const { code, message, data: token } = await http.request<ResponseModel<string>>({ url: RequestURL.LOGIN, method: 'POST', data }, { spin: true });
  if (code === 200) {
    set(CacheKey.TOKEN_NAME, token);
    router.push({ path: get(CacheKey.REDIRECT_ROUTE_NAME) || '/' });
    remove(CacheKey.REDIRECT_ROUTE_NAME);
  } else {
    useMessage().error(message ?? '登录失败, 请稍候重试!');
  }
};

/** 获取验证码 */
export const captcha = <T,>(): Promise<ResponseModel<T>> => {
  return http.request<ResponseModel<T>>({ url: RequestURL.CAPTCHA }, { spin: false, message: false });
};
