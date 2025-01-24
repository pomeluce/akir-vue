import { MockMethod } from 'vite-plugin-mock';
import { faker } from '@faker-js/faker/locale/zh_CN';
import { RequestURL } from '../src/constants/RequestURL';
import { RouteName } from '../src/constants/RouteName';

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
          name: 'Meagle',
          email: 'meagle@gmail.com',
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
        data: [
          {
            key: 'dashboard',
            label: 'Dashboard',
            children: [
              {
                key: RouteName.DASHBOARD_CONSOLE,
                label: '控制台',
              },
              {
                key: RouteName.DASHBOARD_WORKBENCH,
                label: '工作台',
              },
              {
                key: RouteName.DASHBOARD_MONITOR,
                label: '监控页',
              },
            ],
          },
          {
            key: 'system',
            label: '系统管理',
            children: [
              {
                key: RouteName.SYSTEM_USER,
                label: '用户管理',
              },
              {
                key: RouteName.SYSTEM_ROLE,
                label: '角色管理',
              },
              {
                key: RouteName.SYSTEM_PERMISSION,
                label: '权限管理',
              },
              {
                key: RouteName.SYSTEM_MENU,
                label: '菜单管理',
              },
            ],
          },
          {
            key: 'error',
            label: '异常页面',
            children: [
              {
                key: RouteName.ERROR_403,
                label: '403',
                target: '_blank',
              },
              {
                key: RouteName.ERROR_404,
                label: '404',
                target: '_blank',
              },
              {
                key: RouteName.ERROR_500,
                label: '500',
                target: '_blank',
              },
            ],
          },
        ],
      };
    },
  },
] as MockMethod[];
