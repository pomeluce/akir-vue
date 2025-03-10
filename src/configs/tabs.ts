import { DropdownOption } from 'naive-ui';

export const tabContextMenuItems: DropdownOption[] = [
  {
    key: 'refresh',
    label: '刷新标签页',
  },
  {
    key: 'closeTab',
    label: '关闭标签页',
  },
  {
    key: 'closeOther',
    label: '关闭其他标签页',
  },
];

export const defaultTab: TabType = { label: '控制台', key: RouteName.DASHBOARD_CONSOLE };
