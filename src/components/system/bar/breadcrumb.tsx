import { PropType } from 'vue';
import { MenuOption, NBreadcrumb, NBreadcrumbItem, NDropdown, NIcon } from 'naive-ui';

const findMenuPath = (menus: MenuOption[], key?: string): MenuOption[] => {
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
      type: Object as PropType<MenuOption[]>,
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
                {item.icon && <NIcon>{item.icon()}</NIcon>}
                {item.label}
              </span>
            </NDropdown>
          </NBreadcrumbItem>
        ))}
      </NBreadcrumb>
    );
  },
});
