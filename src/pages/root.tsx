import { Suspense, VNode } from 'vue';
import { RouterView } from 'vue-router';
import { darkTheme, dateZhCN, NConfigProvider, NMessageProvider, NModalProvider, zhCN } from 'naive-ui';
import { themeOverrides } from '@/configs/naive';
import { Notice } from '@/components';

export default defineComponent({
  setup() {
    const { themeMode } = useTheme();

    return () => (
      <NConfigProvider
        locale={zhCN}
        dateLocale={dateZhCN}
        theme={themeMode.value === 'dark' ? darkTheme : null}
        themeOverrides={themeMode.value === 'dark' ? themeOverrides.dark : themeOverrides.light}
      >
        <NMessageProvider>
          <NModalProvider>
            <Notice />
            <RouterView>
              {{
                default: ({ Component }: { Component: VNode }) => (Component ? <Suspense>{h(Component)}</Suspense> : null),
              }}
            </RouterView>
          </NModalProvider>
        </NMessageProvider>
      </NConfigProvider>
    );
  },
});
