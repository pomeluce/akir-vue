import { defaultTab } from '@/configs/tabs';

const storage = useStorage({ domain: 'session' });

export default () => {
  const state: TabState = reactive({
    active: defaultTab,
    tabs: [],
    excludes: [],
  });

  getCurrentScope()?.run(() => {
    Object.assign(state, storage.get<TabState>(CacheKey.TABS_ROUTER));
  });

  function wrapTabRouter<T extends any[]>(fn: (...args: T) => void) {
    return (...args: T) => {
      fn(...args);
      storage.set(CacheKey.TABS_ROUTER, state);
    };
  }

  const setActiveTab = wrapTabRouter((tab: TabType = defaultTab) => {
    state.active = tab;
  });

  const addTab = wrapTabRouter((tab: TabType) => {
    const filterTab = state.tabs.find(item => item.key === tab.key);
    if (!filterTab) state.tabs.push(tab);
    state.excludes = state.excludes.filter(key => key !== tab.key);
  });

  const removeTab = wrapTabRouter((tab: TabType) => {
    state.tabs = state.tabs.filter(item => item.key !== tab.key);
    state.excludes.push(tab.key);
  });

  return { state: readonly(state), setActiveTab, addTab, removeTab };
};
