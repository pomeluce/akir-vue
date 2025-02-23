import { NCollapseItem } from 'naive-ui';
import { IconCaretLeftFilled, IconMail } from '@tabler/icons-vue';
import { AkirPanelEdit, AkirPanelInput, AkirPanelTextarea, AkirPanelUserInput } from 'wf/common';

export default defineComponent<{ modelValue: WFBaseNode }, { 'update:modelValue': (value: WFBaseNode) => true }>(
  (props, { emit }) => {
    const vModelNode = computed<WFBaseNode>({
      get: () => props.modelValue,
      set: val => emit('update:modelValue', val),
    });

    const mailTo = computed<UserModel[]>({
      get: () => (vModelNode.value.businessData.mailTo as UserModel[]) || [],
      set: val => (vModelNode.value.businessData.mailTo = val),
    });

    const subject = computed<string>({
      get: () => vModelNode.value.businessData.subject as string,
      set: val => (vModelNode.value.businessData.subject = val),
    });

    const mailContent = computed<string>({
      get: () => vModelNode.value.businessData.mailContent as string,
      set: val => (vModelNode.value.businessData.mailContent = val),
    });

    return () => (
      <NCollapseItem key="ServiceMailTo">
        {{
          header: () => (
            <div class="flex gap-2 grow-1 items-center">
              <IconMail size={18} />
              <span>邮件任务</span>
            </div>
          ),
          default: () => (
            <>
              <AkirPanelEdit label="收件人">
                <AkirPanelUserInput v-model={mailTo.value} />
              </AkirPanelEdit>
              <AkirPanelEdit label="邮件主题">
                <AkirPanelInput v-model={subject.value} />
              </AkirPanelEdit>
              <AkirPanelEdit label="邮件内容">
                <AkirPanelTextarea v-model={mailContent.value} />
              </AkirPanelEdit>
            </>
          ),
          arrow: () => <IconCaretLeftFilled size="18" />,
        }}
      </NCollapseItem>
    );
  },
  { name: 'PanelServiceMailTo', props: ['modelValue'] },
);
