import { MockMethod } from 'vite-plugin-mock';
import { faker } from '@faker-js/faker/locale/zh_CN';
import { RequestURL } from '../src/constants/RequestURL';

export default [
  {
    url: '/api/' + RequestURL.ROLE_LIST,
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: [
          { code: 'ADMIN', name: '超级管理员', description: '拥有所有权限' },
          { code: 'EVERYONE', name: '所有用户', description: '基础功能权限' },
        ].map(v => ({
          id: faker.number.int({ min: 10000, max: 99999 }),
          code: v.code,
          name: v.name,
          description: v.description,
          createTime: faker.date.past().getTime(),
          updateTime: faker.date.recent().getTime(),
        })),
      };
    },
  },
] as MockMethod[];
