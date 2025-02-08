import { RiAlarmWarningLine, RiDashboard3Line, RiListSettingsLine, RiLogoutCircleRLine, RiSettingsLine, RiUser3Line } from '@remixicon/vue';

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
    icon: RiUser3Line,
    onClick: () => {},
  },
  {
    key: 'detail',
    label: '用户设置',
    icon: RiSettingsLine,
    onClick: () => {},
  },
  {
    key: 'logout',
    label: '退出登录',
    icon: RiLogoutCircleRLine,
    onClick: () => {},
  },
];

export const menuIcons = {
  dashboard: RiDashboard3Line,
  system: RiListSettingsLine,
  error: RiAlarmWarningLine,
};

export type MenuIconKeyType = keyof typeof menuIcons;
