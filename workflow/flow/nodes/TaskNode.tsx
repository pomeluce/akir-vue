import { IconUserCog } from '@tabler/icons-vue';

export default defineComponent<{ modelValue: WFTaskNode; direction?: WFDirection }, { 'update:modelValue': (value: WFSubprocessNode) => true }>(
  props => {
    const { modelValue } = props;

    const info = computed<string>(() => {
      const { approvalObject, candidateUsers, candidateGroups } = modelValue!.businessData;
      if (approvalObject === 1) {
        return '发起人';
      } else if (approvalObject === 2) {
        return `指定人: ${(candidateUsers as any[])?.map(i => i.name).join(', ') || '无'}`;
      } else if (approvalObject === 3) {
        return `指定角色: ${(candidateGroups as any[])?.map(i => i.name).join(', ') || '无'}`;
      } else {
        return '';
      }
    });

    return () => (
      <div class="flow-node flow-task">
        <div class="flow-node_header">
          <IconUserCog size={18} /> <span>{modelValue?.name}</span>
        </div>
        <div class="flow-node_content">{info.value}</div>
      </div>
    );
  },
  { name: 'TaskNode', props: ['modelValue', 'direction'] },
);
