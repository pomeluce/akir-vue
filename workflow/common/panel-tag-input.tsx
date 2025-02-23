import { NSelect, NTag } from 'naive-ui';
import { IconAlertCircleFilled, IconCircleCheckFilled } from '@tabler/icons-vue';

type INSelectProps = Omit<InstanceType<typeof NSelect>['$props'], 'renderTag' | 'show' | 'filterable' | 'multiple' | 'tag'>;

interface IPanelTagInputProps {
  modelValue?: Array<string | number>;
  editable?: boolean;
  validator?: () => boolean;
}

type IPanelTagInputEmits = { 'update:modelValue': (value?: Array<string | number>) => true; change: (value?: Array<string | number>) => true };

export default defineComponent<IPanelTagInputProps & INSelectProps, IPanelTagInputEmits>(
  (props, { emit, attrs }) => {
    const computedValue = computed<Array<string | number> | undefined>({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
        emit('change', newValue);
      },
    });

    const computedValidateState = computed<boolean>(() => {
      if (props.validator && typeof props.validator === 'function') {
        return props.validator();
      }
      return !!computedValue.value?.length;
    });

    return () => (
      <NSelect
        class="panel-tag-input"
        v-model={[computedValue.value, 'value']}
        renderTag={({ option }) => h(NTag, { type: 'primary', size: 'small' }, { default: () => option.label })}
        show={false}
        tag
        filterable={props.editable ?? true}
        multiple
        {...attrs}
      >
        {{
          arrow: () => (computedValidateState.value ? <IconCircleCheckFilled class="text-success6" size="18" /> : <IconAlertCircleFilled class="text-warning5" size="18" />),
        }}
      </NSelect>
    );
  },
  { name: 'PanelTagInput', props: ['modelValue', 'editable', 'validator'] },
);
