import { IconSearch } from '@tabler/icons-vue';
import { NButton, NInputGroup } from 'naive-ui';
import { AkirPanelSelect } from '.';

interface IPanelUserInputProps {
  modelValue?: Record<string, unknown>[];
  modelTitle?: string;
  multiple?: boolean;
  rowKey?: string;
  request?: boolean;
  validator?: () => boolean;
}

export default defineComponent<IPanelUserInputProps, { 'update:modelValue': (value: Record<string, unknown>[]) => true; change: (value: Record<string, unknown>[]) => true }>(
  (props, { emit }) => {
    // const validator = computed(() => (props.validator === undefined ? true : props.validator));
    const modalCheckedValues = ref<any[]>([]);

    const computedTags = computed<string[]>({
      get: () => {
        if (Array.isArray(toRaw(props.modelValue))) {
          return props.modelValue!.map(i => i.name as string);
        }
        return [];
      },
      set: names => {
        const newValues = modalCheckedValues.value.filter(i => names.includes(i.name));
        emit('update:modelValue', newValues);
        emit('change', newValues);
      },
    });

    return () => (
      <NInputGroup>
        <AkirPanelSelect
          v-model={computedTags.value}
          validator={props.validator}
          filterable
          tag
          show={false}
          showArrow={false}
          multiple
          onUpdateValue={v => (computedTags.value = [...computedTags.value, v])}
          placeholder="请选择人员"
        />
        <NButton class="min-w-18" type="primary">
          <IconSearch size={18} />
        </NButton>
      </NInputGroup>
    );
  },
);
