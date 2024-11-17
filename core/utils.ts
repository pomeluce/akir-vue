import { cloneDeep } from 'lodash-es';

export const parseEnv = (env: Record<string, any>): ImportMetaEnv => {
  const _env: any = cloneDeep(env);
  /* env 参数转换 */
  Object.entries(env).forEach(([key, value]) => {
    // 转换 boolean 值
    if (value == 'true' || value == 'false') _env[key] = value === 'true';
    // 转换 number 值
    else if (/^\d+$/.test(value)) _env[key] = Number(value);
    // 转换 null 值
    else if (value == 'null' || value == '') _env[key] = null;
    // 转换 undefined 值
    else if (value == 'undefined') _env[key] = undefined;
  });
  return _env;
};
