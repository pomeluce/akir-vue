import { IconUserCog } from '@tabler/icons-vue';

const props = {
  modelValue: {
    type: Object as PropType<WFTaskNode>,
    required: true,
  },
  direction: String as PropType<WFDirection>,
};

export default defineComponent({
  props,
  emits: ['update:modelValue'],
  setup(props) {
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
          <IconUserCog /> <span>{modelValue?.name}</span>
        </div>
        <div class="flow-node_content">{info}</div>
      </div>
    );
  },
});
