import { HTMLAttributes, renderSlot, SlotsType } from 'vue';
import { IFormContext, systemFormContext } from './context';

interface IFormItemProps {
  class?: HTMLAttributes['class'];
  label?: string;
  required?: boolean;
  labelAlign?: 'left' | 'center' | 'right';
}

export default defineComponent<IFormItemProps, {}, string, SlotsType<{ default?: () => any }>>(
  (props, { slots }) => {
    const context = inject<IFormContext>(systemFormContext);

    const labelElementRef = ref<null | HTMLLabelElement>(null);

    const mergedLabelAlignRef = computed(() => {
      const { labelAlign } = props;
      if (labelAlign) return labelAlign;
      if (context?.labelAlign) return context.labelAlign;
      return 'right';
    });

    onMounted(() => {
      const labelElement = labelElementRef.value;
      if (labelElement != null) {
        const memoizedWhitespace = labelElement.style.whiteSpace;
        labelElement.style.whiteSpace = 'nowrap';
        labelElement.style.width = '';
        context?.deriveMaxChildLabelWidth(Number(getComputedStyle(labelElement).width.slice(0, -2)));
        labelElement.style.whiteSpace = memoizedWhitespace;
      }
    });

    return () => (
      <div class={['grid grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_1fr] items-start gap-x-3', props.class]} style={{ gridTemplateAreas: '"label input"' }}>
        {props.label && (
          <label
            ref={labelElementRef}
            class={`grid grid-cols-[1fr_auto] items-center whitespace-nowrap h-auto min-h-8 box-border`}
            style={{ gridArea: 'label', gridTemplateAreas: '"text mark" "text .   "', width: context?.maxChildLabelWidthRef.value + 'px', textAlign: mergedLabelAlignRef.value }}
          >
            <span style={{ gridArea: 'text' }}>{props.label}</span>
            <span class="text-danger6 self-end select-none" style={{ gridArea: 'mark', visibility: props.required ? 'visible' : 'hidden' }}>
              {'\u00A0*'}
            </span>
          </label>
        )}
        {renderSlot(slots, 'default', { style: { gridArea: 'input' } })}
      </div>
    );
  },
  { props: ['label', 'required', 'labelAlign'] },
);
