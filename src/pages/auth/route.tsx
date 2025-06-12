import { RouteLocationNormalizedLoaded, RouterLink, RouterView } from 'vue-router';
import { NIcon } from 'naive-ui';
import { IconAlertCircleFilled } from '@tabler/icons-vue';

export default defineComponent<{}>(() => {
  return () => (
    <main class="w-screen h-screen flex justify-center items-center px-5 bg-backdrop2 dark:bg-backdrop1">
      <RouterView>
        {{
          default: ({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => h(Component, { key: route.fullPath }),
        }}
      </RouterView>
    </main>
  );
});

export const Footer = defineComponent<{}>(() => {
  return () => (
    <main class="flex justify-center gap-3 mt-8 text-sm text-word2">
      <RouterLink to={{ name: RouteName.LOGIN }} activeClass="text-link1 font-bold">
        用户登录
      </RouterLink>
      <RouterLink to={{ name: RouteName.REGISTER }} activeClass="text-link1 font-bold">
        用户注册
      </RouterLink>
      <RouterLink to={{ name: RouteName.HOME }}>网站首页</RouterLink>
    </main>
  );
});

export const ErrorLabel = defineComponent<{ message?: string }>(
  props => {
    return () => (
      <div class={['flex items-center gap-1 px-1 py-0.5 text-danger6 invisible', props.message && 'visible']}>
        <NIcon component={<IconAlertCircleFilled />} />
        <span class="text-xs">{props.message}</span>
      </div>
    );
  },
  { props: ['message'] },
);
