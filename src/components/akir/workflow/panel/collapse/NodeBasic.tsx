import { IconFavicon } from '@tabler/icons-vue';
import { NCollapseItem } from 'naive-ui';
import PanelEdit from '../panel-edit';
import PanelInput from '../panel-input';

const props = { modelValue: { type: Object as PropType<WFBaseNode>, required: true } };

export default defineComponent({
  props,
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const vModelNode = computed<WFBaseNode>({
      get: () => props.modelValue!,
      set: value => emit('update:modelValue', value),
    });

    return () => (
      <NCollapseItem>
        {{
          header: () => (
            <div class="flex items-center">
              <IconFavicon />
              <span>基础信息</span>
            </div>
          ),

          default: () => (
            <PanelEdit label="ID">
              <PanelInput v-model={vModelNode.value.name} disabled />
            </PanelEdit>
          ),
        }}
      </NCollapseItem>
    );
  },
});
