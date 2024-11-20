import { PropType } from 'vue';
import { NBreadcrumb, NBreadcrumbItem, NDropdown, NIcon } from 'naive-ui';
import { MenuIconKeyType, menuIcons } from '@/configs/menus';

const findMenuPath = (menus: MenuModel[], key?: string): MenuModel[] => {
  for (const menu of menus) {
    if (menu.key === key) return [menu];
    if (menu.children) {
      const child = findMenuPath(menu.children, key);
      if (child.length) return [menu, ...child];
    }
  }
  return [];
};

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<MenuModel[]>,
      default: [],
    },
    activeKey: String,
    onClick: Function as PropType<(key: string, label: string, target: string) => void>,
  },
  setup(props) {
    return () => (
      <NBreadcrumb class="flex justify-center items-center">
        {findMenuPath(props.options, props.activeKey).map(item => (
          <NBreadcrumbItem>
            <NDropdown
              options={item.children?.map(option => ({ key: option.key, label: option.label }))}
              onSelect={(key, { label, target }) => props.onClick?.(key, label as string, target as string)}
            >
              <span>
                {menuIcons[item.key as MenuIconKeyType] && <NIcon component={h(menuIcons[item.key as MenuIconKeyType], { size: '18' })} />}
                {item.label}
              </span>
            </NDropdown>
          </NBreadcrumbItem>
        ))}
      </NBreadcrumb>
    );
  },
});
