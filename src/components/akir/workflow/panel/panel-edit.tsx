import { IconHelpCircleFilled } from '@tabler/icons-vue';
import { NPopover } from 'naive-ui';
import { PropType, SlotsType } from 'vue';

const props = {
  label: {
    type: String as PropType<string>,
    default: '',
  },
  description: {
    type: String as PropType<string>,
    default: '',
  },
  tooltip: {
    type: String as PropType<string>,
    default: '',
  },
  align: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  prefix: {
    type: [String, Boolean] as PropType<string | boolean>,
    default: '：',
  },
  textAlign: {
    type: String as PropType<string>,
    default: 'right',
    validator: (val: string) => ['left', 'center', 'right'].includes(val),
  },
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 80,
  },
};

const slots = Object as SlotsType<{ default?: () => any; tooltip?: () => any; description?: () => any }>;

export default defineComponent({
  props,
  slots,
  setup(props, { slots }) {
    const computedStyles = computed(() => {
      return {
        '--label-width': typeof props.labelWidth === 'string' ? props.labelWidth : `${props.labelWidth}px`,
        '--text-align': props.textAlign as 'center',
        '--el-align': props.align === 'vertical' ? 'column' : 'row',
      };
    });

    const computedLabel = computed(() => {
      if (!props.prefix) return props.label;
      return typeof props.prefix === 'string' ? `${props.label}${props.prefix}` : `${props.label}：`;
    });

    return () => (
      <div class="panel-edit w-full flex justify-between text-xs leading-7 flex-(--el-align)" style={computedStyles.value}>
        <div class="w-(--label-width) shrink-0 break-words whitespace-nowrap text-ellipsis overflow-hidden" style={{ textAlign: 'var(--text-align)' as any }}>
          {(props.tooltip || slots.tooltip) && (
            <NPopover placement="top-end">
              {{
                tirgger: () => <IconHelpCircleFilled />,
                default: () => (slots.tooltip ? slots.tooltip() : <div class="max-w-[40vw] break-words whitespace-normal inline-block overflow-hidden">{props.tooltip}</div>),
              }}
            </NPopover>
          )}
          <span title={props.label}>{computedLabel.value}</span>
        </div>
        <div class="flex-1 flex flex-col">
          <div>{slots.default?.()}</div>
          {(!!props.description || slots.description) && (
            <div class="text-xs leading-4 pt-2">
              {slots.description && <span> {slots.description()}</span>}
              {slots.description?.()}
            </div>
          )}
        </div>
      </div>
    );
  },
});
