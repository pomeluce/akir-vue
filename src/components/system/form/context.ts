import { InjectionKey } from 'vue';

export interface IFormContext {
  deriveMaxChildLabelWidth: (width: number) => void;
  maxChildLabelWidthRef: Ref<number | undefined>;
  labelAlign?: 'left' | 'center' | 'right';
}

export const systemFormContext: InjectionKey<IFormContext> = Symbol('systemFormContext');
