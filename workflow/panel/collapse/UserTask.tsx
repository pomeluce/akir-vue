import { IconCaretLeftFilled, IconUserCog } from '@tabler/icons-vue';
import { NCollapseItem } from 'naive-ui';
import { AkirPanelEdit, AkirPanelRoleInput, AkirPanelSelect, AkirPanelUserInput } from 'wf/common';
import { approvalObjectOptions } from 'wf/configuration';

export default defineComponent<{ modelValue: WFBaseNode }, { 'update:modelValue': (value: WFBaseNode) => true }>(
  (props, { emit }) => {
    const vModelNode = computed<WFBaseNode>({
      get: () => props.modelValue,
      set: val => emit('update:modelValue', val),
    });

    const approvalObject = computed<number>({
      get: () => vModelNode.value.businessData?.approvalObject as number,
      set: val => (vModelNode.value.businessData.approvalObject = val),
    });
    const candidateUsers = computed<UserModel[]>({
      get: () => (vModelNode.value.businessData?.candidateUsers as UserModel[]) || [],
      set: val => (vModelNode.value.businessData.candidateUsers = val),
    });
    const candidateGroups = computed<RoleModel[]>({
      get: () => (vModelNode.value.businessData?.candidateGroups as RoleModel[]) || [],
      set: val => (vModelNode.value.businessData.candidateGroups = val),
    });

    const updateCandidateConfig = () => {
      vModelNode.value.businessData.candidateUsers = [];
      vModelNode.value.businessData.candidateGroups = [];
    };

    return () => (
      <NCollapseItem key="UserTask">
        {{
          header: () => (
            <div class="flex gap-2 grow-1 items-center">
              <IconUserCog size={18} />
              <span>审批人</span>
            </div>
          ),
          default: () => (
            <>
              <AkirPanelEdit label="审批对象">
                <AkirPanelSelect v-model={approvalObject.value} options={approvalObjectOptions} onUpdateValue={updateCandidateConfig} />
              </AkirPanelEdit>
              {approvalObject.value === 2 && (
                <AkirPanelEdit label="选择审批人">
                  <AkirPanelUserInput v-model={candidateUsers.value} />
                </AkirPanelEdit>
              )}
              {approvalObject.value === 3 && (
                <AkirPanelEdit label="选择审批角色">
                  <AkirPanelRoleInput v-model={candidateGroups.value} />
                </AkirPanelEdit>
              )}
            </>
          ),
          arrow: () => <IconCaretLeftFilled size="18" />,
        }}
      </NCollapseItem>
    );
  },
  { name: 'PanelUserTask', props: ['modelValue'] },
);
