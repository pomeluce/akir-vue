export const useTheme = () => {
  const theme = inject<Ref<ThemeType>>('theme');
  const themeMode = inject<Ref<ThemeModeType>>('themeMode');
  const setTheme = inject<(theme: ThemeType) => void>('setTheme');

  if (!theme || !themeMode || !setTheme) {
    throw new Error('useTheme must be used within a FlxProvider');
  }

  return { theme, themeMode, setTheme };
};
