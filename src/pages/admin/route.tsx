import Logo from '/pomeluce.svg';
import { KeepAlive } from 'vue';
import { RouteLocationNormalizedLoaded, RouterLink, RouterView } from 'vue-router';
import { NCollapseTransition, NLayout, NLayoutSider, NMenu } from 'naive-ui';
import { Avatar, Screen, ThemePopup } from '@/components';
import { MenuIconKeyType, menuIcons } from '@/configs/menus';

export default defineComponent({
  setup() {
    const collapsed = ref<boolean>(false);
    const store = useUserStore();
    const tabStore = useTabStore();
    const route = useRoute();
    const router = useRouter();

    const handleClick = (key: string, label: string) => {
      tabStore.setActiveTab({ key, label });
      router.push({ name: key });
    };

    onMounted(() => tabStore.setActiveTab({ key: route.name as string, label: route.meta.label! }));

    return () => (
      <NLayout class="w-screen h-screen" hasSider>
        <NLayoutSider
          class="border-rim2 border-r h-full"
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
          <nav>
            <NMenu
              defaultValue={route.name as string}
              value={tabStore.activeTab?.key}
              collapsed={collapsed.value}
              collapsedWidth={64}
              collapsedIconSize={18}
              options={store.menus.map(item => {
                const icon = menuIcons[item.key as MenuIconKeyType];
                return icon ? { ...item, icon: () => h(icon, { size: '18' }) } : item;
              })}
              onUpdateValue={(key, item) => handleClick(key, item.label as string)}
            />
          </nav>
        </NLayoutSider>
        <main class="flex flex-col flex-1">
          <header class="flex justify-end h-[60px] items-center py-3 px-10 bg-backdrop2 relative border-b border-rim2 z-40">
            <section class="flex items-center gap-3">
              <Screen />
              <ThemePopup />
              <Avatar />
            </section>
          </header>
          <main class="flex-1 p-5">
            <RouterView>
              {{
                default: ({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => <KeepAlive>{h(Component, { key: route.fullPath })}</KeepAlive>,
              }}
            </RouterView>
          </main>
        </main>
      </NLayout>
    );
  },
});
