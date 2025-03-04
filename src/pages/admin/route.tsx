import Logo from '/akir.svg';
import { KeepAlive } from 'vue';
import { RouteLocationNormalizedLoaded, RouterLink, RouterView } from 'vue-router';
import { NCollapseTransition, NDropdown, NLayout, NLayoutSider, NMenu, NTooltip } from 'naive-ui';
import { IconLayoutSidebarFilled, IconX } from '@tabler/icons-vue';
import { Avatar, Breadcrumb, Screen, ThemePopup } from '@/components';
import { MenuIconKeyType, menuIcons } from '@/configs/menus';
import { tabContextMenuItems } from '@/configs/tabs';

export default defineComponent<{}>(() => {
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

  const renderMenuIcon = (menu: MenuModel) => {
    const icon = menuIcons[menu.key as MenuIconKeyType];
    if (menu.children) menu.children = menu.children.map(renderMenuIcon);
    return icon ? { ...menu, icon: () => h(icon, { size: '18' }) } : menu;
  };

  const menuOptions = computed<MenuModel[]>(() => store.menus.map(renderMenuIcon));

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
      message.warning('当前为最后一标签页了, 无法再关闭了');
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
            value={tabStore.activeTab?.key}
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
                'akir-tab flex justify-center items-center gap-1 pl-4 pr-3 py-2 bg-backdrop2 text-sm shadow-xs rounded cursor-pointer select-none',
                item.key === tabStore.activeTab?.key && 'text-primary6',
              ]}
              onContextmenu={e => handleContextMenu(e, item)}
            >
              <span onClick={() => handleClick(item.key, item.label)}>{item.label}</span>
              <span onClick={() => handleClose(item)}>
                <IconX size="16" />
              </span>
            </div>
          ))}
          <NDropdown
            placement="bottom-start"
            trigger="manual"
            x={contextMenuX.value}
            y={contextMenuY.value}
            options={tabContextMenuItems}
            show={contextMenuVisible.value}
            onClickoutside={handleClickOutside}
            onSelect={handleSelect}
          />
        </nav>
        <main class="px-3 pb-3 flex-1">
          {/* TODO: 403 页面和 500 页面优化, 路由地址不变, 添加认证组件, 判断是否渲染 403/500 页面还是路由页面 */}
          <RouterView>
            {{
              default: ({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => (
                <KeepAlive exclude={tabStore.excludes}>{h(Component, { key: route.fullPath, class: 'h-full' })}</KeepAlive>
              ),
            }}
          </RouterView>
        </main>
      </main>
    </NLayout>
  );
});
