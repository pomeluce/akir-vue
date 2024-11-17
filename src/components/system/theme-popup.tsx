import { RiLeafFill, RiMoonClearFill, RiSunFill } from '@remixicon/vue';
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
            icon: () => <RiLeafFill size={dropSize} />,
          },
          {
            key: 'light',
            label: '亮色主题',
            icon: () => <RiSunFill size={dropSize} />,
          },
          {
            key: 'dark',
            label: '深色主题',
            icon: () => <RiMoonClearFill size={dropSize} />,
          },
        ]}
        onSelect={setTheme}
      >
        <div>{theme.value === 'system' ? <RiLeafFill size={size} /> : theme.value === 'light' ? <RiSunFill size={size} /> : <RiMoonClearFill size={size} />}</div>
      </NDropdown>
    );
  },
});
