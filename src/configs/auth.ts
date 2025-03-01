import { yup } from '@/plugins';
import { toTypedSchema } from '@vee-validate/yup';

export const loginValidate = (defaultValues?: LoginFormModel) => {
  const { errors, values, defineField, handleSubmit } = useForm<LoginFormModel>({
    initialValues: defaultValues,
    validationSchema: toTypedSchema(
      yup
        .object({
          username: yup.string().required().email().label('邮箱'),
          password: yup.string().required().min(8).label('密码'),
          captcha: yup.string().required().label('验证码'),
        })
        .required(),
    ),
  });

  const [username, usernameAttrs] = defineField('username', { validateOnBlur: true });
  const [password, passwordAttrs] = defineField('password', { validateOnBlur: true });
  const [captcha, captchaAttrs] = defineField('captcha', { validateOnBlur: true });

  return { errors, handleSubmit, model: { username, password, captcha }, attrs: { username: usernameAttrs, password: passwordAttrs, captcha: captchaAttrs }, values };
};

export const registerValidate = (defaultValues?: RegisterFormModel) => {
  const { errors, values, defineField, handleSubmit } = useForm<RegisterFormModel>({
    initialValues: defaultValues,
    validationSchema: toTypedSchema(
      yup
        .object({
          username: yup.string().required().email().label('邮箱'),
          password: yup.string().required().min(8).label('密码'),
          confirm: yup
            .string()
            .required()
            .oneOf([yup.ref('password')], '两次密码不一致')
            .label('确认密码'),
          captcha: yup.string().required().label('验证码'),
        })
        .required(),
    ),
  });

  const [username, usernameAttrs] = defineField('username', { validateOnBlur: true });
  const [password, passwordAttrs] = defineField('password', { validateOnBlur: true });
  const [confirm, confirmAttrs] = defineField('confirm', { validateOnBlur: true });
  const [captcha, captchaAttrs] = defineField('captcha', { validateOnBlur: true });

  return {
    errors,
    handleSubmit,
    model: { username, password, confirm, captcha },
    attrs: { username: usernameAttrs, password: passwordAttrs, confirm: confirmAttrs, captcha: captchaAttrs },
    values,
  };
};
