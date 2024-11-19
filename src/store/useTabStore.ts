export default defineStore('tab', () => {
  const activeTab = ref<TabState>();
  const tabs = ref<TabState[]>([]);
  const excludes = ref<string[]>([]);

  function setActiveTab(tab: TabState | undefined) {
    activeTab.value = tab;
  }

  function addTab(tab: TabState) {
    const filterTab = tabs.value.find(item => item.key === tab.key);
    if (!filterTab) tabs.value.push(tab);
    excludes.value = excludes.value.filter(key => key !== tab.key);
  }

  function removeTab(tab: TabState) {
    tabs.value = tabs.value.filter(item => item.key !== tab.key);
    excludes.value.push(tab.key);
  }

  return { activeTab, tabs, excludes, setActiveTab, addTab, removeTab };
});
