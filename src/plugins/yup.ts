import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: '${label}不能为空',
  },
  string: {
    email: '邮箱格式错误',
    min: '${label}不能少于 ${min} 个字符',
    max: '${label}不能多于 ${max} 个字符',
  },
  number: {
    min: '${label}不能小于 ${min}',
    max: '${label}不能大于 ${max}',
  },
  date: {
    min: '${label}不能早于 ${min}',
    max: '${label}不能晚于 ${max}',
  },
});

export default yup;
