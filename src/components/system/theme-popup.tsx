import { RiCompass2Line, RiMoonClearLine, RiSunLine } from '@remixicon/vue';
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
            icon: () => <RiCompass2Line size={dropSize} />,
            props: { class: 'px-1.5 py-1 !h-auto' },
          },
          {
            key: 'light',
            label: '亮色主题',
            icon: () => <RiSunLine size={dropSize} />,
            props: { class: 'px-1.5 py-1 !h-auto' },
          },
          {
            key: 'dark',
            label: '深色主题',
            icon: () => <RiMoonClearLine size={dropSize} />,
            props: { class: 'px-1.5 py-1 !h-auto' },
          },
        ]}
        onSelect={setTheme}
      >
        <div>{theme.value === 'system' ? <RiCompass2Line size={size} /> : theme.value === 'light' ? <RiSunLine size={size} /> : <RiMoonClearLine size={size} />}</div>
      </NDropdown>
    );
  },
});
