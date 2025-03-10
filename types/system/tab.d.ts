interface TabType {
  key: string;
  label: string;
}

interface TabState {
  active: TabType;
  tabs: TabType[];
  excludes: string[];
}
