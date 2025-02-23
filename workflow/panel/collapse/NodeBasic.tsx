import { IconCaretLeftFilled, IconFavicon } from '@tabler/icons-vue';
import { NCollapseItem } from 'naive-ui';
import { AkirPanelEdit, AkirPanelInput } from '../../common';

export default defineComponent<{ modelValue: WFBaseNode }, { 'update:modelValue': (value: WFBaseNode) => true }>(
  (props, { emit }) => {
    const vModelNode = computed<WFBaseNode>({
      get: () => props.modelValue!,
      set: value => emit('update:modelValue', value),
    });

    const disabled = computed(() => props.modelValue.businessData.$type === 'startEvent' || props.modelValue.businessData.$type === 'endEvent');

    return () => (
      <NCollapseItem key="NodeBasic">
        {{
          header: () => (
            <div class="flex gap-2 grow-1 items-center">
              <IconFavicon size={18} />
              <span>基础信息</span>
            </div>
          ),

          default: () => (
            <>
              <AkirPanelEdit label="ID">
                <AkirPanelInput v-model={vModelNode.value.id} disabled />
              </AkirPanelEdit>
              <AkirPanelEdit label="名称">
                <AkirPanelInput v-model={vModelNode.value.name} disabled={disabled.value} />
              </AkirPanelEdit>
            </>
          ),
          arrow: () => <IconCaretLeftFilled size="18" />,
        }}
      </NCollapseItem>
    );
  },
  { name: 'PanelNodeBasic', props: ['modelValue'] },
);
