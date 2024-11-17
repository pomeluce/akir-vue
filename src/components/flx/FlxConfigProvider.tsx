import { PropType, SlotsType } from 'vue';

export const FlxConfigProvider = defineComponent({
  props: {
    defaultTheme: String as PropType<ThemeType>,
    onToggleTheme: Function as PropType<(theme: ThemeType) => void>,
  },
  slots: Object as SlotsType<{
    default?: () => any;
  }>,
  setup(props, { slots }) {
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

    onMounted(() => {
      const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
      colorScheme.addEventListener('change', listenerSystemColorMode);
      return () => {
        colorScheme.removeEventListener('change', listenerSystemColorMode);
      };
    });

    provide('theme', themeRef);
    provide('themeMode', mode);
    provide('setTheme', (theme: ThemeType) => (themeRef.value = theme));

    return () => <>{slots.default && slots.default()}</>;
  },
});
