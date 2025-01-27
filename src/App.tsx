import { AkirConfigProvider } from '@/components';
import Root from '@/pages/root';

export default defineComponent({
  setup() {
    const { get, set } = useStorage();
    const themeMode = get(CacheKey.THEME_MODE, 'system');
    const handleToggleTheme = (theme: ThemeType) => {
      set(CacheKey.THEME_MODE, theme);
    };

    return () => (
      <AkirConfigProvider defaultTheme={themeMode} onToggleTheme={handleToggleTheme}>
        <Root />
      </AkirConfigProvider>
    );
  },
});
