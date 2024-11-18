interface ITab {
  key: string;
  label: string;
}

export default defineStore('tab', () => {
  const activeTab = ref<ITab>();
  const tabs = ref<ITab[]>([]);

  function setActiveTab(tab: ITab) {
    activeTab.value = tab;
  }

  function addTab(tab: ITab) {
    const filterTab = tabs.value.find(item => item.key === tab.key);
    !filterTab && tabs.value.push(tab);
  }

  function removeTab(tab: ITab) {
    tabs.value = tabs.value.filter(item => item.key !== tab.key);
  }

  return { activeTab, tabs, setActiveTab, addTab, removeTab };
});
