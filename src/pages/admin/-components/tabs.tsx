import { NDropdown } from 'naive-ui';
import { IconX } from '@tabler/icons-vue';
import { tabContextMenuItems } from '@/configs/tabs';

export default defineComponent<{}>(() => {
  const contextMenuX = ref<number>(0);
  const contextMenuY = ref<number>(0);
  const contextMenuVisible = ref<boolean>(false);
  const contextMenuTab = ref<TabType>();

  const router = useRouter();
  const { state, setActiveTab, removeTab } = useTabs();
  const { navigate, redirect } = usePageNavigator();

  const computedDisabled = computed(() => {
    const tabIndex = state.tabs.findIndex(tab => tab.key === contextMenuTab.value?.key);
    return {
      closeTab: state.tabs.length === 1,
      closeOther: state.tabs.filter(tab => tab.key !== contextMenuTab.value?.key || tab.key !== state.active.key).length === 0,
      closeLeft: state.tabs.toSpliced(tabIndex).filter(tab => tab.key !== state.active.key).length === 0,
      closeRight: state.tabs.toSpliced(0, tabIndex + 1).filter(tab => tab.key !== state.active.key).length === 0,
      closeAll: state.tabs.filter(tab => tab.key !== state.active.key).length === 0,
    };
  });

  const handleClick = (key: string, label: string, replace: boolean = true) => {
    setActiveTab({ key, label });
    navigate({ name: key }, replace);
  };

  const handleClose = (tab: TabType) => {
    if (state.tabs.length === 1) return;
    removeTab(tab);
    if (tab.key === state.active.key) {
      setActiveTab(state.tabs.at(-1));
      router.push({ name: state.active.key });
    }
  };

  const handleContextMenu = (e: MouseEvent, tab: TabType) => {
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
    const tabIndex = state.tabs.findIndex(tab => tab.key === contextMenuTab.value?.key);
    if (contextMenuTab.value) {
      switch (key) {
        case 'refresh':
          redirect();
          break;
        case 'closeTab':
          handleClose(contextMenuTab.value);
          break;
        case 'closeOther':
          state.tabs.filter(tab => tab.key !== contextMenuTab.value?.key).forEach(tab => tab.key !== state.active.key && removeTab(tab));
          break;
        case 'closeLeft':
          state.tabs.toSpliced(tabIndex).forEach(tab => tab.key !== state.active.key && removeTab(tab));
          break;
        case 'closeRight':
          state.tabs.toSpliced(0, tabIndex + 1).forEach(tab => tab.key !== state.active.key && removeTab(tab));
          break;
        case 'closeAll':
          state.tabs.filter(tab => tab.key !== state.active.key).forEach(tab => removeTab(tab));
          break;
        default:
          break;
      }
    }
  };

  return () => (
    <nav class="px-3 flex justify-start items-center gap-2">
      {state.tabs.map(item => (
        <div
          class={[
            'akir-tab flex justify-center items-center gap-1 pl-4 pr-3 py-2 bg-backdrop2 text-sm shadow-xs rounded cursor-pointer select-none',
            item.key === state.active.key && 'text-primary6',
          ]}
          onContextmenu={e => handleContextMenu(e, item)}
        >
          <span onClick={() => handleClick(item.key, item.label)}>{item.label}</span>
          {state.tabs.length !== 1 && (
            <span onClick={() => handleClose(item)}>
              <IconX size="16" />
            </span>
          )}
        </div>
      ))}
      <NDropdown
        class="rounded-lg! border border-rim2! py-2!"
        placement="bottom-start"
        trigger="manual"
        x={contextMenuX.value}
        y={contextMenuY.value}
        options={tabContextMenuItems(computedDisabled)}
        show={contextMenuVisible.value}
        onClickoutside={handleClickOutside}
        onSelect={handleSelect}
      />
    </nav>
  );
});
