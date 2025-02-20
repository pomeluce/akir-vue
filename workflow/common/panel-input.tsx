import { NInput } from 'naive-ui';
import { IconAlertCircleFilled, IconCircleCheckFilled } from '@tabler/icons-vue';

type INInputProps = InstanceType<typeof NInput>['$props'];

interface IPanelInputProps {
  modelValue?: string;
  validator?: () => boolean;
}

type IPanelInputEmits = { 'update:modelValue': (value?: string) => true; input: (value?: string) => true };

export default defineComponent<IPanelInputProps & INInputProps, IPanelInputEmits>(
  (props, { emit, attrs }) => {
    const computedValue = computed<string | undefined>({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
        emit('input', newValue);
      },
    });

    const computedValidateState = computed<boolean>(() => {
      if (props.validator && typeof props.validator === 'function') {
        return props.validator();
      }
      return !!computedValue.value?.length;
    });

    return () => (
      <NInput v-model={[computedValue.value, 'value']} {...attrs}>
        {{
          suffix: () => (computedValidateState.value ? <IconCircleCheckFilled class="text-success6" size="18" /> : <IconAlertCircleFilled class="text-warning5" size="18" />),
        }}
      </NInput>
    );
  },
  { name: 'PanelInput', props: ['modelValue', 'validator'] },
);
