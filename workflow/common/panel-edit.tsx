import { SlotsType } from 'vue';
import { NPopover } from 'naive-ui';
import { IconHelpCircleFilled } from '@tabler/icons-vue';

interface IPanelEditProps {
  label?: string;
  description?: string;
  tooltip?: string;
  align?: 'horizontal' | 'vertical';
  prefix?: string | boolean;
  textAlign?: 'left' | 'center' | 'right';
  labelWidth?: number | string;
}

type IPanelEditSlots = SlotsType<{ default?: () => any; tooltip?: () => any; description?: () => any }>;

export default defineComponent<IPanelEditProps, {}, string, IPanelEditSlots>(
  (props, { slots }) => {
    const label = computed(() => props.label || '');
    const description = computed(() => props.description || '');
    const tooltip = computed(() => props.tooltip || '');
    const prefix = computed(() => props.prefix || ':');
    const labelWidth = computed(() => props.labelWidth || 80);
    const textAlign = computed(() => props.textAlign || 'right');
    const align = computed(() => props.align || 'horizontal');

    const computedStyles = computed(() => {
      return {
        '--label-width': typeof labelWidth.value === 'string' ? labelWidth.value : `${labelWidth.value}px`,
        '--text-align': textAlign.value,
        '--el-align': align.value === 'vertical' ? 'column' : 'row',
      };
    });

    const computedLabel = computed(() => {
      if (!prefix) return label.value;
      return typeof prefix.value === 'string' ? `${label.value}${prefix.value}` : `${label.value}:`;
    });

    return () => (
      <div class="panel-edit w-full flex justify-between text-xs leading-7 flex-(--el-align) gap-2" style={computedStyles.value}>
        <div class="w-(--label-width) shrink-0 break-words whitespace-nowrap text-ellipsis overflow-hidden" style={{ textAlign: 'var(--text-align)' as any }}>
          {(tooltip.value || slots.tooltip) && (
            <NPopover placement="top-end">
              {{
                tirgger: () => <IconHelpCircleFilled />,
                default: () => (slots.tooltip ? slots.tooltip() : <div class="max-w-[40vw] break-words whitespace-normal inline-block overflow-hidden">{tooltip.value}</div>),
              }}
            </NPopover>
          )}
          <span title={label.value}>{computedLabel.value}</span>
        </div>
        <div class="flex-1 flex flex-col">
          <div>{slots.default?.()}</div>
          {(!!description.value || slots.description) && (
            <div class="text-xs leading-4 pt-2">
              {description && <span> {description.value}</span>}
              {slots.description?.()}
            </div>
          )}
        </div>
      </div>
    );
  },
  { name: 'PanelEdit', props: ['label', 'description', 'tooltip', 'align', 'prefix', 'textAlign', 'labelWidth'] },
);
