import { InjectionKey } from 'vue';

export const WFAppMenuGetter: InjectionKey<WFAppendMenuProvider<WFBaseNodeType>> = Symbol('WFAppendMenuGetter');
