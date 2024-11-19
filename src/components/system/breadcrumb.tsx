import { PropType } from 'vue';
import { NBreadcrumb, NBreadcrumbItem, NDropdown } from 'naive-ui';

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<MenuModel[]>,
      default: [],
    },
    activeKey: String,
    onClick: Function as PropType<(key: string, label: string) => void>,
  },
  setup(props) {
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

    return () => (
      <NBreadcrumb>
        {findMenuPath(props.options, props.activeKey).map(item => (
          <NBreadcrumbItem>
            <NDropdown options={item.children?.map(option => ({ key: option.key, label: option.label }))} onSelect={(key, { label }) => props.onClick?.(key, label as string)}>
              {item.label}
            </NDropdown>
          </NBreadcrumbItem>
        ))}
      </NBreadcrumb>
    );
  },
});
