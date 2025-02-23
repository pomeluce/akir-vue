import { NRadioButton, NRadioGroup } from 'naive-ui';
import { WFEnumsOptions } from 'wf/configuration';

interface IPanelRadioGroupProps {
  modelValue?: string | number | boolean;
  options?: WFEnumsOptions<string | number | boolean>;
}

type IPanelRadioGroupEmits = {
  'update:modelValue': (value: string | number | boolean) => true;
  input: (value: string | number | boolean) => true;
  change: (value: string | number | boolean) => true;
};

export default defineComponent<IPanelRadioGroupProps, IPanelRadioGroupEmits>(
  (props, { emit }) => {
    const handleChecked = (value: string | number | boolean) => {
      emit('update:modelValue', value);
      emit('input', value);
      emit('change', value);
    };

    return () => (
      <NRadioGroup value={props.modelValue} onUpdateValue={handleChecked}>
        {props.options?.map(option => <NRadioButton key={`${option.value}`} value={option.value} label={option.label} disabled={option.disabled} />)}
      </NRadioGroup>
    );
  },
  { name: 'PanelRadioGroup', props: ['modelValue', 'options'] },
);
