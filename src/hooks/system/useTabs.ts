import { defaultTab } from '@/configs/tabs';

const storage = useStorage({ domain: 'session' });

export default () => {
  const state: TabState = reactive({
    active: defaultTab,
    tabs: [defaultTab],
    includes: [],
  });

  Object.assign(state, storage.get<TabState>(CacheKey.TABS_ROUTER));

  watch(state, value => storage.set(CacheKey.TABS_ROUTER, value), { immediate: true });

  const setActiveTab = (tab: TabType = defaultTab) => {
    state.active = tab;
  };

  const addTab = (tab: TabType) => {
    if (!state.tabs.find(item => item.key === tab.key)) state.tabs.push(tab);
    if (!state.includes.find(key => tab.key === key)) state.includes.push(tab.key);
  };

  const removeTab = (tab: TabType) => {
    state.tabs = state.tabs.filter(item => item.key !== tab.key);
    state.includes = state.includes.filter(key => key !== tab.key);
  };

  return { state: readonly(state), setActiveTab, addTab, removeTab };
};
