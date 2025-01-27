import Logo from '/pomeluce.svg';
import { KeepAlive } from 'vue';
import { RouteLocationNormalizedLoaded, RouterLink, RouterView } from 'vue-router';
import { DropdownOption, NCollapseTransition, NDropdown, NLayout, NLayoutSider, NMenu } from 'naive-ui';
import { RiCloseLine } from '@remixicon/vue';
import { Avatar, Breadcrumb, Screen, ThemePopup } from '@/components';
import { MenuIconKeyType, menuIcons } from '@/configs/menus';

export default defineComponent({
  setup() {
    const collapsed = ref<boolean>(false);
    const contextMenuX = ref<number>(0);
    const contextMenuY = ref<number>(0);
    const contextMenuVisible = ref<boolean>(false);
    const contextMenuTab = ref<TabState>();
    const store = useUserStore();
    const tabStore = useTabStore();
    const route = useRoute();
    const router = useRouter();
    const message = useMessage();

    const contextMenuItems: DropdownOption[] = [
      {
        key: 'refresh',
        label: '刷新标签页',
      },
      {
        key: 'closeTab',
        label: '关闭标签页',
      },
      {
        key: 'closeOther',
        label: '关闭其他标签页',
      },
    ];

    const handleClick = (key: string, label: string, target?: string) => {
      const tab = { key, label };
      if (target === '_blank') {
        window.open(router.resolve({ name: key }).fullPath, target);
      } else {
        tabStore.setActiveTab(tab);
        tabStore.addTab(tab);
        router.push({ name: key });
      }
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

    const handleContextMenu = (e: MouseEvent, tab: TabState) => {
      e.preventDefault();
      contextMenuVisible.value = false;
      contextMenuTab.value = tab;
      nextTick().then(() => {
        contextMenuVisible.value = true;
        contextMenuX.value = e.clientX;
        contextMenuY.value = e.clientY;
      });
    };

    const handleClickOutside = () => (contextMenuVisible.value = false);
    const handleSelect = (key: string) => {
      contextMenuVisible.value = false;
      if (contextMenuTab.value) {
        switch (key) {
          case 'refresh':
            handleClick(contextMenuTab.value.key, contextMenuTab.value.label);
            break;
          default:
            break;
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
          width="200"
          showTrigger
          onCollapse={() => (collapsed.value = true)}
          onExpand={() => (collapsed.value = false)}
        >
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
              value={tabStore.activeTab?.key}
              collapsed={collapsed.value}
              collapsedWidth={64}
              collapsedIconSize={18}
              options={store.menus.map(item => {
                const icon = menuIcons[item.key as MenuIconKeyType];
                return icon ? { ...item, icon: () => h(icon, { size: '18' }) } : item;
              })}
              onUpdateValue={(key, { label, target }) => handleClick(key, label as string, target as string)}
            />
          </nav>
        </NLayoutSider>
        <main class="flex flex-col gap-2 flex-1">
          <header class="flex justify-between h-[60px] items-center py-3 px-3 bg-backdrop2 relative border-b border-rim2 z-40">
            <section>
              <Breadcrumb options={store.menus} activeKey={tabStore.activeTab?.key} onClick={handleClick} />
            </section>
            <section class="flex items-center gap-3 px-2">
              <Screen />
              <ThemePopup />
              <Avatar />
            </section>
          </header>
          <nav class="px-3 flex justify-start items-center gap-2">
            {tabStore.tabs.map(item => (
              <div
                class={[
                  'akir-tab flex justify-center items-center gap-1 pl-4 pr-3 py-2 bg-backdrop2 text-sm shadow-sm rounded cursor-pointer select-none',
                  item.key === tabStore.activeTab?.key && 'text-primary6',
                ]}
                onContextmenu={e => handleContextMenu(e, item)}
              >
                <span onClick={() => handleClick(item.key, item.label)}>{item.label}</span>
                <span onClick={() => handleClose(item)}>
                  <RiCloseLine size="16" />
                </span>
              </div>
            ))}
            <NDropdown
              placement="bottom-start"
              trigger="manual"
              x={contextMenuX.value}
              y={contextMenuY.value}
              options={contextMenuItems}
              show={contextMenuVisible.value}
              onClickoutside={handleClickOutside}
              onSelect={handleSelect}
            />
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
