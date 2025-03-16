import Logo from '/akir.svg';
import { KeepAlive } from 'vue';
import { RouteLocationNormalizedLoaded, RouterLink, RouterView } from 'vue-router';
import { NCollapseTransition, NLayout, NLayoutSider, NMenu, NTooltip } from 'naive-ui';
import { IconLayoutSidebarFilled } from '@tabler/icons-vue';
import { SystemAvatarPopup, SystemBreadcrumb, SystemScreen, SystemThemePopup, SystemWithBoundary } from '@/components';
import { MenuIconKeyType, menuIcons } from '@/configs/menus';
import Tabs from './-components/tabs';

export default defineComponent<{}>(() => {
  const collapsed = ref<boolean>(false);
  const store = useUserStore();
  const route = useRoute();
  const router = useRouter();

  const { navigate, openRoute } = usePageNavigator();
  const { state, setActiveTab, addTab } = useTabs();

  const renderMenuIcon = (menu: MenuModel) => {
    const icon = menuIcons[menu.key as MenuIconKeyType];
    if (menu.children) menu.children = menu.children.map(renderMenuIcon);
    return icon ? { ...menu, icon: () => h(icon, { size: '18' }) } : menu;
  };

  const menuOptions = computed<MenuModel[]>(() => store.menus.map(renderMenuIcon));

  const handleClick = (key: string, label: string, target?: string) => {
    const tab = { key, label };
    if (target === '_blank') {
      openRoute(key, target);
    } else {
      addTab(tab);
      setActiveTab(tab);
      router.push({ name: key });
    }
  };

  onBeforeMount(() => {
    if (route.name !== state.active.key) {
      navigate({ name: state.active.key }, true);
    }
  });

  return () => (
    <NLayout class="w-screen h-screen" hasSider>
      <NLayoutSider class="h-full border-r border-rim1 shadow-xs" collapsed={collapsed.value} collapse-mode="width" collapsedWidth={64} width="240">
        <header class="flex justify-center items-center py-5">
          <RouterLink class="flex justify-center items-center gap-1 font-bold overflow-hidden hover:text-word1/80" to={{ name: RouteName.HOME }}>
            <img class="w-5 h-5" src={Logo} />
            <NCollapseTransition show={!collapsed.value} class="text-lg font-bold uppercase">
              akir-vue
            </NCollapseTransition>
          </RouterLink>
        </header>
        <nav>
          <NMenu
            defaultValue={route.name as string}
            value={state.active.key}
            collapsed={collapsed.value}
            collapsedWidth={64}
            collapsedIconSize={18}
            options={menuOptions.value}
            onUpdateValue={(key, { label, target }) => handleClick(key, label as string, target as string)}
          />
        </nav>
      </NLayoutSider>
      <main class="flex flex-col gap-1 flex-1">
        <header class="flex justify-between h-[60px] items-center py-3 px-3 bg-backdrop2 relative border-b border-rim1 z-40">
          <section class="flex justify-center items-stretch gap-3">
            <NTooltip>
              {{
                trigger: () => (
                  <button class="flex items-center bg-transparent [&:focus,&:focus-within,&:focus-visible]:outline-none" onClick={() => (collapsed.value = !collapsed.value)}>
                    <IconLayoutSidebarFilled size="20" />
                  </button>
                ),
                default: () => <span class="text-xs">{!collapsed.value ? '收起' : '展开'}菜单</span>,
              }}
            </NTooltip>
            <SystemBreadcrumb options={store.menus} activeKey={state.active.key} onClick={handleClick} />
          </section>
          <section class="flex items-center gap-3 px-2">
            <SystemScreen />
            <SystemThemePopup />
            <SystemAvatarPopup />
          </section>
        </header>
        <Tabs />
        <main class="px-3 pb-3 flex-1 overflow-hidden">
          <RouterView>
            {{
              default: ({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => (
                <SystemWithBoundary>
                  <KeepAlive include={state.includes.slice()}>{h(Component, { key: route.fullPath, class: 'h-full overflow-scroll' })}</KeepAlive>
                </SystemWithBoundary>
              ),
            }}
          </RouterView>
        </main>
      </main>
    </NLayout>
  );
});
