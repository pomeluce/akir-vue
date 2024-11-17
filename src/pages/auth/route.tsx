import { RouteLocationNormalizedLoaded, RouterLink, RouterView } from 'vue-router';

export default defineComponent({
  setup() {
    return () => (
      <main class="w-screen h-screen flex justify-center items-center px-5 bg-[url('@/assets/images/auth-bg.svg')]">
        <RouterView>
          {{
            default: ({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => h(Component, { key: route.fullPath }),
          }}
        </RouterView>
      </main>
    );
  },
});

export const Footer = defineComponent({
  setup() {
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
  },
});
