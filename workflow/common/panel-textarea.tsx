import { IconAlertCircleFilled, IconCircleCheckFilled } from '@tabler/icons-vue';
import { NInput } from 'naive-ui';

type INTextareaProps = Omit<InstanceType<typeof NInput>['$props'], 'type'>;

interface IPanelTeatareaProps {
  modelValue?: string;
  useValidate?: boolean;
  validator?: () => boolean;
}

type IPanelTextareaEmits = { 'update:modelValue': (value?: string) => true; input: (value?: string) => true };

export default defineComponent<IPanelTeatareaProps & INTextareaProps, IPanelTextareaEmits>(
  (props, { emit, attrs }) => {
    const useValidate = computed(() => props.useValidate || true);

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
      <div class="relative box-border m-0 p-0 w-full leading-[1]">
        <NInput type="textarea" v-model={[computedValue.value, 'value']} resizable={false} {...attrs} />
        {useValidate && (
          <div class="absolute top-0 right-0 w-8 h-8 flex justify-center items-center z-10  pointer-events-none">
            {computedValidateState.value ? <IconCircleCheckFilled class="text-success6" size="18" /> : <IconAlertCircleFilled class="text-warning5" size="18" />}
          </div>
        )}
      </div>
    );
  },
  { name: 'PanelTextarea', props: ['modelValue', 'useValidate', 'validator'] },
);
