import { IconCaretLeftFilled, IconSend } from '@tabler/icons-vue';
import { NCheckbox, NCheckboxGroup, NCollapseItem } from 'naive-ui';
import { AkirPanelEdit, AkirPanelTextarea, AkirPanelUserInput } from 'wf/common';
import { copyMessageTypeOptions } from 'wf/configuration/enums';

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
    const transferTo = computed<UserModel[]>({
      get: () => vModelNode.value.businessData.transferTo as UserModel[],
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
              <IconSend size={18} />
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
              <AkirPanelEdit label="抄送人">
                <AkirPanelUserInput v-model={transferTo.value} />
              </AkirPanelEdit>
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
  { name: 'PanelServiceCopyTo', props: ['modelValue'] },
);
