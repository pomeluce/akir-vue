import Logo from '/pomeluce.svg';
import { RouteLocationNormalizedLoaded, RouterLink, RouterView } from 'vue-router';
import { NCollapseTransition, NLayout, NLayoutSider } from 'naive-ui';
import { Avatar, Screen, ThemePopup } from '@/components';

export default defineComponent({
  setup() {
    const collapsed = ref<boolean>(false);

    return () => (
      <NLayout class="w-screen h-screen bg-transparent" hasSider>
        <NLayoutSider
          class="bg-backdrop2 border-rim2 border-r h-full"
          collapsed={collapsed.value}
          collapse-mode="width"
          collapsedWidth={64}
          width="240"
          showTrigger
          onCollapse={() => (collapsed.value = true)}
          onExpand={() => (collapsed.value = false)}
        >
          <header class="flex justify-center items-center py-5">
            <RouterLink class="flex justify-center items-center gap-1 font-bold overflow-hidden hover:text-word1/80" to={{ name: RouteName.HOME }}>
              <img class="w-5 h-5" src={Logo} />
              <NCollapseTransition show={!collapsed.value} class="text-lg font-bold uppercase">
                flx-vue
              </NCollapseTransition>
            </RouterLink>
          </header>
          <nav></nav>
        </NLayoutSider>
        <main class="flex flex-col flex-1">
          <header class="flex justify-end h-[60px] items-center py-3 px-5 bg-backdrop2 relative border-b border-rim2 z-40">
            <section class="flex items-center gap-3">
              <Screen />
              <ThemePopup />
              <Avatar />
            </section>
          </header>
          <main class="flex-1 p-5">
            <RouterView>
              {{
                default: ({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => h(Component, { key: route.fullPath }),
              }}
            </RouterView>
          </main>
        </main>
      </NLayout>
    );
  },
});
