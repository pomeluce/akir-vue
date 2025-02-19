import { PropType } from 'vue';
import { NInput } from 'naive-ui';
import { IconAlertCircleFilled, IconCircleCheckFilled } from '@tabler/icons-vue';

const props = { modelValue: String as PropType<string>, validator: Function as PropType<() => boolean> };

export default defineComponent({
  props,
  emits: ['update:modelValue', 'input'],
  setup(props, { emit, attrs }) {
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
      <NInput v-model={computedValue.value} {...attrs}>
        {{
          icon: () => (computedValidateState.value ? <IconCircleCheckFilled class="text-success6" /> : <IconAlertCircleFilled class="text-warning5" />),
        }}
      </NInput>
    );
  },
});
