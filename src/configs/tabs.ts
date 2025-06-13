import { IconChevronsLeft, IconChevronsRight, IconMinus, IconRefresh, IconTransfer, IconX } from '@tabler/icons-vue';
import { DropdownOption } from 'naive-ui';

type IContextMenuDisabledState = ComputedRef<{ refresh: boolean; closeTab: boolean; closeOther: boolean; closeLeft: boolean; closeRight: boolean; closeAll: boolean }>;

export const tabContextMenuItems = (computedDisabled: IContextMenuDisabledState): DropdownOption[] => [
  {
    key: 'refresh',
    disabled: computedDisabled.value.refresh,
    icon: () => h(IconRefresh, { size: 18 }),
    label: '刷新当前标签页',
    props: { class: 'px-2' },
  },
  {
    key: 'closeTab',
    disabled: computedDisabled.value.closeTab,
    icon: () => h(IconMinus, { size: 18 }),
    label: '关闭当前标签页',
    props: { class: 'px-2' },
  },
  {
    key: 'closeOther',
    disabled: computedDisabled.value.closeOther,
    icon: () => h(IconTransfer, { size: 18 }),
    label: '关闭其他标签页',
    props: { class: 'px-2' },
  },
  {
    key: 'closeLeft',
    disabled: computedDisabled.value.closeLeft,
    icon: () => h(IconChevronsLeft, { size: 18 }),
    label: '关闭左侧标签页',
    props: { class: 'px-2' },
  },
  {
    key: 'closeRight',
    disabled: computedDisabled.value.closeRight,
    icon: () => h(IconChevronsRight, { size: 18 }),
    label: '关闭右侧标签页',
    props: { class: 'px-2' },
  },
  {
    key: 'closeAll',
    disabled: computedDisabled.value.closeAll,
    icon: () => h(IconX, { size: 18 }),
    label: '关闭所有标签页',
    props: { class: 'px-2' },
  },
];

export const defaultTab: TabType = { label: '控制台', key: RouteName.DASHBOARD_CONSOLE };
