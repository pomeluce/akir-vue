import { Load } from '@/components';
import { PropType } from 'vue';
export interface ISpinProps {
  color?: string;
  bgColor?: string;
  content?: string;
}

export const AkirSpin = defineComponent({
  props: { options: Object as PropType<ISpinProps> },
  setup({ options }) {
    return () => (
      <div
        class={'akir-spin w-screen h-screen fixed inset-0 flex flex-col gap-2 justify-center items-center text-primary6 z-100 bg-backdrop2/45'}
        style={{ backgroundColor: options?.bgColor, color: options?.color }}
      >
        <div class="relative w-10 h-10" role="img" aria-label="loading">
          <div class="absolute w-full h-full">
            <div class="animate-spin animate-duration-3000">
              <Load class="w-10" strokeWidth={20} />
            </div>
          </div>
        </div>
        {options?.content && <span>{options?.content}</span>}
      </div>
    );
  },
});
