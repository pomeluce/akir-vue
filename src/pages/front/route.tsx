import Logo from '/akir.svg';
import { RouteLocationNormalizedLoaded, RouterLink, RouterView } from 'vue-router';
import { Avatar, Screen, ThemePopup } from '@/components';
import { topMenus } from '@/configs/menus';

export default defineComponent(() => {
  return () => (
    <main>
      <main class="flex items-center h-[60px] bg-backdrop2 border-b border-rim2 sticky top-0 z-50">
        <div class="flex justify-between items-center px-3 w-full 2xl:w-page 2xl:m-auto">
          <section class="flex items-center xl:items-stretch md:mr-6">
            <div class="flex justify-center items-center">
              <RouterLink to={{ name: RouteName.HOME }} class="flex justify-between items-center gap-1 font-bold mr-5 hover:text-word1/80">
                <img class="w-5 h-5" src={Logo} />
                <span class="font-bold uppercase">akir-vue</span>
              </RouterLink>
            </div>
            <main class="xl:flex justify-center items-center gap-3 font-bold opacity-95 hidden">
              {topMenus.map(menu => (
                <RouterLink class="flex items-center gap-1" key={menu.key} to={{ name: menu.key }} activeClass="text-link1">
                  {menu.label}
                </RouterLink>
              ))}
            </main>
          </section>
          <section class="flex items-center gap-3">
            <Screen />
            <ThemePopup />
            <Avatar />
          </section>
        </div>
      </main>
      <RouterView>
        {{
          default: ({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) =>
            Component ? h(Component, { key: route.fullPath, class: 'w-full 2xl:w-page mx-auto p-3 mt-5' }) : null,
        }}
      </RouterView>
    </main>
  );
});
