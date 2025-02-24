import { IconAdjustmentsCog, IconAlertSquareRounded, IconDashboard, IconLogout, IconPhoto, IconSettings2, IconUser } from '@tabler/icons-vue';

export const topMenus = [
  { label: '首页', key: RouteName.HOME },
  { label: '登录页', key: RouteName.LOGIN },
  { label: '注册页', key: RouteName.REGISTER },
  // { label: '组件列表', key: RouteName.COMPONENTS },
  { label: '系统后台', key: RouteName.ADMIN },
];

export const avatarMenus = [
  {
    key: 'user',
    label: '个人中心',
    icon: IconUser,
    onClick: () => {},
  },
  {
    key: 'detail',
    label: '用户设置',
    icon: IconSettings2,
    onClick: () => {},
  },
  {
    key: 'logout',
    label: '退出登录',
    icon: IconLogout,
    onClick: () => {},
  },
];

export const menuIcons = {
  dashboard: IconDashboard,
  system: IconAdjustmentsCog,
  error: IconAlertSquareRounded,
  'error.403': IconPhoto,
  'error.404': IconPhoto,
  'error.500': IconPhoto,
};

export type MenuIconKeyType = keyof typeof menuIcons;
