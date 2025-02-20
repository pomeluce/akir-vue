import { IconAlertCircleFilled, IconCircleCheckFilled } from '@tabler/icons-vue';
import { isArray, isUndefined } from 'lodash-es';
import { NSelect } from 'naive-ui';

type INSelectProps = InstanceType<typeof NSelect>['$props'];

type SelectModelValue = string | number | boolean | Record<string, any>;

interface IPanelSelectProps {
  modelValue?: SelectModelValue | SelectModelValue[];
  validator?: () => boolean;
}

type IPanelSelectEmits = {
  'update:modelValue': (value?: SelectModelValue | SelectModelValue[]) => true;
  input: (value?: SelectModelValue | SelectModelValue[]) => true;
  change: (value?: SelectModelValue | SelectModelValue[]) => true;
};

export default defineComponent<IPanelSelectProps & INSelectProps, IPanelSelectEmits>(
  (props, { emit, attrs }) => {
    const computedValue = computed<SelectModelValue | SelectModelValue[] | undefined>({
      get: () => props.modelValue,
      set: value => {
        emit('update:modelValue', value);
        emit('input', value);
        emit('change', value);
      },
    });

    const computedValidateState = computed<boolean>(() => {
      if (props.validator && typeof props.validator === 'function') {
        return props.validator();
      }
      if (typeof props.modelValue === 'string' || isArray(props.modelValue)) {
        return !!props.modelValue.length;
      }
      return !isUndefined(computedValue.value);
    });

    return () => (
      <NSelect v-model={[computedValue.value, 'value']} {...attrs}>
        {{
          arrow: () => (computedValidateState.value ? <IconCircleCheckFilled class="text-success6" size="18" /> : <IconAlertCircleFilled class="text-warning5" size="18" />),
        }}
      </NSelect>
    );
  },
  { name: 'PanelSelect', props: ['modelValue', 'validator'] },
);
