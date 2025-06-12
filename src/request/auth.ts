import { http, router } from '@/plugins';

const storage = useStorage();

/** 登录接口 */
export const login = async (data: LoginFormModel) => {
  const { code, data: token } = await http.request<ResponseModel<string>>({ url: RequestURL.LOGIN, method: 'POST', data }, { spin: true, message: true });
  if (HttpEntityCode.SUCCESS === code) {
    storage.set(CacheKey.ACCESS_TOKEN, token);
    router.push({ path: storage.get(CacheKey.REDIRECT_ROUTE_NAME) || '/' });
    storage.remove(CacheKey.REDIRECT_ROUTE_NAME);
  }
};

export const logout = async () => {
  const { code } = await http.request<ResponseModel<boolean>>({ url: RequestURL.LOGOUT });
  if (HttpEntityCode.SUCCESS === code) {
    storage.remove(CacheKey.ACCESS_TOKEN);
    await router.push({ name: RouteName.LOGIN });
  }
};

/** 获取验证码 */
export const captcha = <T>(captchaType: CaptchaType): Promise<ResponseModel<T>> => {
  return http.request<ResponseModel<T>>({ url: RequestURL.CAPTCHA, params: { type: captchaType } }, { spin: false, message: false });
};
