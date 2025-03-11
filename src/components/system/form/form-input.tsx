import { NInput } from 'naive-ui';

type INInputProps = InstanceType<typeof NInput>['$props'];

export default defineComponent<{ label?: string; required?: boolean } & INInputProps>(
  (props, { attrs }) => {
    return () => (
      <div class="flex items-center gap-3">
        {props.label && (
          <label class="whitespace-nowrap">
            <span>{props.label}</span>
            {props.required && <span class="text-danger6"> *</span>}
          </label>
        )}
        <NInput {...attrs} />
      </div>
    );
  },
  { props: ['label', 'required'] },
);
