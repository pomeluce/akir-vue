type WFDirection = 'horizontal' | 'vertical';

interface WFAppendMenuItem<T extends WFBaseNodeType> {
  type: T;
  name: string;
  businessData: Partial<WFBaseNodeBO>;
  icon?: Component;
  iconStyle?: CSSProperties;
}
type WFAppendMenuProvider<T extends WFBaseNodeType> = (node?: WFBaseNode) => Array<WFAppendMenuItem<T>>;
