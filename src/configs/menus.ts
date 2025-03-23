import { MenuOption } from 'naive-ui';
import { Icon, IconAdjustmentsCog, IconAlertSquareRounded, IconDashboard, IconLogout, IconPhoto, IconSettings2, IconTimeline, IconUser } from '@tabler/icons-vue';
import { logout } from '@/request/auth';

const { handleTree } = useToolkit();

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
    onClick: logout,
  },
];

const menuIcons: Record<string, Icon> = {
  dashboard: IconDashboard,
  system: IconAdjustmentsCog,
  workflow: IconTimeline,
  error: IconAlertSquareRounded,
  'error.403': IconPhoto,
  'error.404': IconPhoto,
  'error.500': IconPhoto,
};

export const handleMenuTree = (menus: MenuModel[]) => {
  const resolver = (menu: MenuModelTree) => {
    const icon = menuIcons[menu.code];
    const result: MenuOption = { key: menu.code, label: menu.label, show: menu.show, disabled: menu.disabled, target: menu.target };
    if (menu.children) result.children = menu.children.map(resolver);
    return icon ? { ...result, icon: () => h(icon, { size: '18' }) } : result;
  };

  return (handleTree(menus, 'menuId') as MenuModelTree[]).map(resolver);
};
