import { IconDeviceLaptop, IconMoonStars, IconSun } from '@tabler/icons-vue';
import { NDropdown } from 'naive-ui';

export default defineComponent({
  setup() {
    const { theme, setTheme } = useTheme();
    const size = '20';
    const dropSize = '18';

    return () => (
      <NDropdown
        options={[
          {
            key: 'system',
            label: '跟随系统',
            icon: () => <IconDeviceLaptop size={dropSize} />,
            props: { class: 'px-1.5 py-1 !h-auto' },
          },
          {
            key: 'light',
            label: '亮色主题',
            icon: () => <IconSun size={dropSize} />,
            props: { class: 'px-1.5 py-1 !h-auto' },
          },
          {
            key: 'dark',
            label: '深色主题',
            icon: () => <IconMoonStars size={dropSize} />,
            props: { class: 'px-1.5 py-1 !h-auto' },
          },
        ]}
        onSelect={setTheme}
      >
        <div>{theme.value === 'system' ? <IconDeviceLaptop size={size} /> : theme.value === 'light' ? <IconSun size={size} /> : <IconMoonStars size={size} />}</div>
      </NDropdown>
    );
  },
});
