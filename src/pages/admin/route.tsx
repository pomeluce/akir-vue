import Logo from '/pomeluce.svg';
import { KeepAlive } from 'vue';
import { RouteLocationNormalizedLoaded, RouterLink, RouterView } from 'vue-router';
import { NCollapseTransition, NLayout, NLayoutSider, NMenu } from 'naive-ui';
import { RiCloseLine } from '@remixicon/vue';
import { Avatar, Screen, ThemePopup } from '@/components';
import { MenuIconKeyType, menuIcons } from '@/configs/menus';

export default defineComponent({
  setup() {
    const collapsed = ref<boolean>(false);
    const store = useUserStore();
    const tabStore = useTabStore();
    const route = useRoute();
    const router = useRouter();
    const message = useMessage();

    const handleClick = (key: string, label: string) => {
      const tab = { key, label };
      tabStore.setActiveTab(tab);
      tabStore.addTab(tab);
      router.push({ name: key });
    };

    const handleClose = (tab: TabState) => {
      if (tabStore.tabs.length === 1) {
        message.warning('当前为最后一页了, 无法再关闭了');
      } else {
        tabStore.removeTab(tab);
        if (tab.key === tabStore.activeTab?.key) {
          tabStore.setActiveTab(tabStore.tabs.at(-1));
          router.push({ name: tabStore.activeTab?.key });
        }
      }
    };

    onMounted(() => {
      const tab = { key: route.name as string, label: route.meta.label! };
      tabStore.setActiveTab(tab);
      tabStore.addTab(tab);
    });

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
              onUpdateValue={(key, { label }) => handleClick(key, label as string)}
            />
          </nav>
        </NLayoutSider>
        <main class="flex flex-col gap-2 flex-1">
          <header class="flex justify-end h-[60px] items-center py-3 px-10 bg-backdrop2 relative border-b border-rim2 z-40">
            <section class="flex items-center gap-3">
              <Screen />
              <ThemePopup />
              <Avatar />
            </section>
          </header>
          <nav class="px-3 flex justify-start items-center gap-2">
            {tabStore.tabs.map(item => (
              <div
                class={[
                  'flex justify-center items-center gap-2 px-3 py-2 bg-backdrop2 text-sm shadow-sm cursor-pointer select-none',
                  item.key === tabStore.activeTab?.key && 'text-primary6',
                ]}
              >
                <span onClick={() => handleClick(item.key, item.label)}>{item.label}</span>
                <span onClick={() => handleClose(item)}>
                  <RiCloseLine size="16" />
                </span>
              </div>
            ))}
          </nav>
          <main class="px-3 pb-3 flex-1">
            <RouterView>
              {{
                default: ({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => (
                  <KeepAlive exclude={tabStore.excludes}>{h(Component, { key: route.fullPath })}</KeepAlive>
                ),
              }}
            </RouterView>
          </main>
        </main>
      </NLayout>
    );
  },
});
