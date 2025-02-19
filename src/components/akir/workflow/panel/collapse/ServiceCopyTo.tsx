import { IconCaretLeftFilled, IconSend } from '@tabler/icons-vue';
import { NCheckbox, NCheckboxGroup, NCollapseItem } from 'naive-ui';
import { copyMessageTypeOptions } from '../../configuration/enums';
import { AkirPanelEdit, AkirPanelTextarea } from '../../common';

export default defineComponent<{ modelValue: WFBaseNode }, { 'update:modelValue': (value: WFBaseNode) => true }>(
  (props, { emit }) => {
    const vModelNode = computed<WFBaseNode>({
      get: () => props.modelValue,
      set: val => emit('update:modelValue', val),
    });

    const messageType = computed<string[]>({
      get: () => vModelNode.value.businessData.messageType as string[],
      set: val => (vModelNode.value.businessData.messageType = val),
    });
    const transferTo = computed<any[]>({
      get: () => vModelNode.value.businessData.transferTo as any[],
      set: val => (vModelNode.value.businessData.transferTo = val),
    });
    const messageContent = computed<string>({
      get: () => vModelNode.value.businessData.messageContent as string,
      set: val => (vModelNode.value.businessData.messageContent = val),
    });

    return () => (
      <NCollapseItem key="ServiceCopyTo">
        {{
          header: () => (
            <div class="flex gap-2 grow-1 items-center">
              <IconSend />
              <span>抄送任务</span>
            </div>
          ),
          default: () => (
            <>
              <AkirPanelEdit label="消息类型">
                <NCheckboxGroup v-model={[messageType.value, 'value']}>
                  {copyMessageTypeOptions.map(option => (
                    <NCheckbox label={option.label} value={option.value} />
                  ))}
                </NCheckboxGroup>
              </AkirPanelEdit>
              <AkirPanelEdit label="抄送人"></AkirPanelEdit>
              <AkirPanelEdit label="消息内容">
                <AkirPanelTextarea v-model={messageContent.value} />
              </AkirPanelEdit>
            </>
          ),
          arrow: () => <IconCaretLeftFilled size="18" />,
        }}
      </NCollapseItem>
    );
  },
  { props: ['modelValue'] },
);
