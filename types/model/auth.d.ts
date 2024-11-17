/* 登录表单模型 */
interface LoginFormModel {
  username: string;
  password: string;
  captcha: string;
  uid?: string;
}

/* 注册表单模型 */
interface RegisterFormModel extends LoginFormModel {
  confirm: string;
}

/* 验证码模型 */
interface CaptchaModel {
  uid: string;
  image: string;
}
