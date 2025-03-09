import { SlotsType } from 'vue';

interface IConfigProviderProps {
  defaultTheme?: ThemeType;
  onToggleTheme?: (theme: ThemeType) => void;
}

export const AkirConfigProvider = defineComponent<IConfigProviderProps, {}, string, SlotsType<{ default?: () => any }>>(
  (props, { slots }) => {
    const themeRef = ref<ThemeType>(props.defaultTheme ?? 'system');
    const mode = ref<ThemeModeType>('light');

    const listenerSystemColorMode = (e: MediaQueryListEvent) => {
      if (themeRef.value === 'system') {
        const currentMode = e.matches ? 'dark' : 'light';
        document.documentElement.dataset.theme = currentMode;
        mode.value = currentMode;
      }
    };

    watchEffect(() => {
      const currentMode = themeRef.value === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : themeRef.value;
      document.documentElement.dataset.theme = currentMode;
      mode.value = currentMode;
      props.onToggleTheme?.(themeRef.value);
    });

    useEventListener(window.matchMedia('(prefers-color-scheme: dark)'), 'change', listenerSystemColorMode);

    provide('theme', themeRef);
    provide('themeMode', mode);
    provide('setTheme', (theme: ThemeType) => (themeRef.value = theme));

    return () => <>{slots.default && slots.default()}</>;
  },
  { name: 'AkirConfigProvider', props: ['defaultTheme', 'onToggleTheme'] },
);
