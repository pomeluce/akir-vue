type MenuModel = {
  key: string;
  label: string | (() => VNodeChild);
  show?: boolean;
  icon?: () => VNode;
  disabled?: boolean;
  children?: MenuModel[];
  target?: string;
} & {
  key: string;
  label: string | (() => VNodeChild);
  show?: boolean;
  type?: 'group';
} & {
  key: string;
  props: HTMLAttributes;
  show?: boolean;
  type?: 'divider';
};
