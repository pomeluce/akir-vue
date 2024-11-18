import { MockMethod } from 'vite-plugin-mock';
import { faker } from '@faker-js/faker/locale/zh_CN';
import { RequestURL } from '../src/constants/RequestURL';

export default [
  {
    url: '/api/' + RequestURL.CURRENT_USER,
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          id: 1001,
          name: 'Flx',
          email: 'flx@gmail.com',
          gender: 1,
          avatar: '/src/assets/images/avatar.png',
          phone: '18888888888',
          createTime: 1604940444444,
          updateTime: 1604940444444,
        },
        body: {
          role: 'amdin',
        },
      };
    },
  },
  {
    url: '/api/' + RequestURL.USER_LIST + '/:number',
    method: 'get',
    response: ({ query: { number } }) => {
      return {
        code: 200,
        message: 'success',
        data: Array.from({ length: number }, () => ({
          id: faker.number.int({ min: 10000, max: 99999 }),
          name: faker.person.fullName(),
          gender: faker.number.int({ min: 0, max: 1 }),
          email: faker.internet.email(),
          technique: faker.helpers.arrayElements(['java', 'vue', 'python', 'typescript', 'react', 'spring', 'orcale'], {
            min: 1,
            max: 5,
          }),
          createTime: faker.date.past().getTime(),
          updateTime: faker.date.recent().getTime(),
        })),
      };
    },
  },
  {
    url: '/api/' + RequestURL.USER_MENUS,
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '获取菜单列表成功',
        data: {
          front: [],
          backend: [
            {
              key: 'admin',
              label: 'Dashboard',
              order: 1,
              children: [],
            },
          ],
        },
      };
    },
  },
] as MockMethod[];
