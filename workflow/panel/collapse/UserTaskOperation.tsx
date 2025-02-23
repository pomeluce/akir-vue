import { NCheckbox, NCheckboxGroup, NCollapseItem } from 'naive-ui';
import { IconCaretLeftFilled, IconCirclesRelation } from '@tabler/icons-vue';
import { AkirPanelEdit } from 'wf/common';

type IAuthPointOptionType = { id: string; name: string; sn: string; selected: number; orderNo: number; remark: string };

export default defineComponent<{ modelValue: WFBaseNode }, { 'update:modelValue': (value: WFBaseNode) => true }>(
  (props, { emit }) => {
    const vModelNode = computed<WFBaseNode>({
      get: () => props.modelValue,
      set: val => emit('update:modelValue', val),
    });

    const authPointOptions = ref<IAuthPointOptionType[]>([
      {
        id: 'aa927a0955144e30bf68241d1cab6059',
        name: '审批',
        sn: 'approve',
        selected: 0,
        orderNo: 1,
        remark: '',
      },
      {
        id: '40288a45725e28f901725e2c0fbd0001',
        name: '签收',
        sn: 'claim',
        selected: 0,
        orderNo: 3,
        remark: '',
      },
      {
        id: '54074597ca944e9a8b7665c0f5e55c5f',
        name: '转办',
        sn: 'turn_do',
        selected: 0,
        orderNo: 3,
        remark: '',
      },
      {
        id: '3ad85a5407e86136e56adc41b389bc86',
        name: '暂存',
        sn: 'hold_task',
        selected: 0,
        orderNo: 4,
        remark: '暂存',
      },
      {
        id: '0be55b738a9a43aeb8123bc3834bfc05',
        name: '加签',
        sn: 'addsign',
        selected: 0,
        orderNo: 6,
        remark: '加签之后不需要审批直接流下去',
      },
      {
        id: 'ddd4c6a8be5b4ae7ae305b9619a60ebf',
        name: '驳回',
        sn: 'reject',
        selected: 0,
        orderNo: 7,
        remark: '',
      },
      {
        id: 'e37e3fb69069445aac5e03d0be490176',
        name: '撤回',
        sn: 'revoke',
        selected: 0,
        orderNo: 8,
        remark: 'test',
      },
      {
        id: 'b2d352161b49452aa84fb58c0acfb756',
        name: '转阅',
        sn: 'turn_read',
        selected: 0,
        orderNo: 9,
        remark: '',
      },
      {
        id: '40288128727e172301727e1723400000',
        name: '委派',
        sn: 'delegate',
        selected: 0,
        orderNo: 10,
        remark: '委派给别人，处理完之后又回到我这里',
      },
    ]);

    const authPoints = computed<string[]>({
      get: () => (vModelNode.value.businessData.authPoints as IAuthPointOptionType[])?.map(i => i.id) || [],
      set: selectedIds => {
        const selectedPoints = authPointOptions.value.filter(i => selectedIds.includes(i.id));
        selectedPoints.forEach(i => (i.selected = 1));
        vModelNode.value.businessData.authPoints = selectedPoints;
      },
    });

    return () => (
      <NCollapseItem>
        {{
          header: () => (
            <div class="flex gap-2 grow-1 items-center">
              <IconCirclesRelation size={18} />
              <span>操作项</span>
            </div>
          ),
          default: () => (
            <AkirPanelEdit label="操作">
              <NCheckboxGroup v-model={[authPoints.value, 'value']}>
                {authPointOptions.value.map(v => (
                  <NCheckbox key={v.id} value={v.id} label={v.name} size="small" />
                ))}
              </NCheckboxGroup>
            </AkirPanelEdit>
          ),
          arrow: () => <IconCaretLeftFilled size="18" />,
        }}
      </NCollapseItem>
    );
  },
  { name: 'UserTaskOperation', props: ['modelValue'] },
);
