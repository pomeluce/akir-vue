import { http, router } from '@/plugins';

const storage = useStorage();

/** 登录接口 */
export const login = async (data: LoginFormModel) => {
  const { code, message, data: token } = await http.request<ResponseModel<string>>({ url: RequestURL.LOGIN, method: 'POST', data }, { spin: true });
  if (code === 200) {
    storage.set(CacheKey.TOKEN_NAME, token);
    await router.push({ path: storage.get(CacheKey.REDIRECT_ROUTE_NAME) || '/' });
    storage.remove(CacheKey.REDIRECT_ROUTE_NAME);
  } else {
    useMessage().error(message ?? '登录失败, 请稍候重试!');
  }
};

/** 获取验证码 */
export const captcha = <T,>(): Promise<ResponseModel<T>> => {
  return http.request<ResponseModel<T>>({ url: RequestURL.CAPTCHA }, { spin: false, message: false });
};
