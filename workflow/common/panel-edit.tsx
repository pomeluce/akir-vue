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
    const { label = '', description = '', tooltip = '', align = 'horizontal', prefix = ': ', textAlign = 'right', labelWidth = 80 } = props;
    const computedStyles = computed(() => {
      return {
        '--label-width': typeof labelWidth === 'string' ? labelWidth : `${labelWidth}px`,
        '--text-align': textAlign as 'center',
        '--el-align': align === 'vertical' ? 'column' : 'row',
      };
    });

    const computedLabel = computed(() => {
      if (!prefix) return label;
      return typeof prefix === 'string' ? `${label}${prefix}` : `${label}：`;
    });

    return () => (
      <div class="panel-edit w-full flex justify-between text-xs leading-7 flex-(--el-align)" style={computedStyles.value}>
        <div class="w-(--label-width) shrink-0 break-words whitespace-nowrap text-ellipsis overflow-hidden" style={{ textAlign: 'var(--text-align)' as any }}>
          {(tooltip || slots.tooltip) && (
            <NPopover placement="top-end">
              {{
                tirgger: () => <IconHelpCircleFilled />,
                default: () => (slots.tooltip ? slots.tooltip() : <div class="max-w-[40vw] break-words whitespace-normal inline-block overflow-hidden">{tooltip}</div>),
              }}
            </NPopover>
          )}
          <span title={label}>{computedLabel.value}</span>
        </div>
        <div class="flex-1 flex flex-col">
          <div>{slots.default?.()}</div>
          {(!!description || slots.description) && (
            <div class="text-xs leading-4 pt-2">
              {slots.description && <span> {slots.description()}</span>}
              {slots.description?.()}
            </div>
          )}
        </div>
      </div>
    );
  },
  { name: 'PanelEdit', props: ['label', 'description', 'tooltip', 'align', 'prefix', 'textAlign', 'labelWidth'] },
);
