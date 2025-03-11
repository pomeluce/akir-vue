import { defaultTab } from '@/configs/tabs';

const storage = useStorage({ domain: 'session' });

let initialized = false;

export default () => {
  const state: TabState = reactive({
    active: defaultTab,
    tabs: [defaultTab],
    excludes: [],
  });

  if (!initialized) {
    initialized = true;
    Object.assign(state, storage.get<TabState>(CacheKey.TABS_ROUTER));
  }

  watch(state, value => storage.set(CacheKey.TABS_ROUTER, value), { immediate: true });

  const setActiveTab = (tab: TabType = defaultTab) => {
    state.active = tab;
  };

  const addTab = (tab: TabType) => {
    const filterTab = state.tabs.find(item => item.key === tab.key);
    if (!filterTab) state.tabs.push(tab);
    state.excludes = state.excludes.filter(key => key !== tab.key);
  };

  const removeTab = (tab: TabType) => {
    state.tabs = state.tabs.filter(item => item.key !== tab.key);
    state.excludes.push(tab.key);
  };

  return { state: readonly(state), setActiveTab, addTab, removeTab };
};
