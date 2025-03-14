import { FormHTMLAttributes, SlotsType } from 'vue';
import { systemFormContext } from './context';

export default defineComponent<FormHTMLAttributes & { labelAlign?: 'left' | 'center' | 'right' }, {}, string, SlotsType<{ default?: () => any }>>(
  (props, { slots, attrs }) => {
    const maxChildLabelWidthRef = ref<number | undefined>(undefined);

    const deriveMaxChildLabelWidth = (currentWidth: number): void => {
      const currentMaxChildLabelWidth = maxChildLabelWidthRef.value;
      if (currentMaxChildLabelWidth === undefined || currentWidth >= currentMaxChildLabelWidth) {
        maxChildLabelWidthRef.value = currentWidth;
      }
    };

    provide(systemFormContext, { deriveMaxChildLabelWidth, maxChildLabelWidthRef, labelAlign: props.labelAlign });

    return () => <form {...attrs}>{slots.default && slots.default()}</form>;
  },
  { props: ['labelAlign'] },
);
