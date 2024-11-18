interface MenuModel {
  key: string;
  label?: string | (() => VNodeChild);
  show?: boolean;
  icon?: () => VNode;
  disabled?: boolean;
  children?: MenuModel[];
  type?: 'group' | 'divider';
  props?: HTMLAttributes;
}
