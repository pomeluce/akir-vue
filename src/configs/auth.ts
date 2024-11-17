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

  const [username] = defineField('username', { validateOnBlur: true });
  const [password] = defineField('password', { validateOnBlur: true });
  const [captcha] = defineField('captcha', { validateOnBlur: true });

  return { errors, handleSubmit, model: { username, password, captcha }, values };
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

  const [username] = defineField('username', { validateOnBlur: true });
  const [password] = defineField('password', { validateOnBlur: true });
  const [confirm] = defineField('confirm', { validateOnBlur: true });
  const [captcha] = defineField('captcha', { validateOnBlur: true });

  return { errors, handleSubmit, model: { username, password, confirm, captcha }, values };
};
