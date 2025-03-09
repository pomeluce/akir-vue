import { ILoad } from '@/components';

export interface ISpinProps {
  color?: string;
  bgColor?: string;
  content?: string;
}

export const AkirSpin = defineComponent<ISpinProps>(
  props => {
    return () => (
      <div
        class={'akir-spin w-screen h-screen fixed inset-0 flex flex-col gap-2 justify-center items-center text-primary6 z-100 bg-backdrop2/45'}
        style={{ backgroundColor: props?.bgColor, color: props?.color }}
      >
        <div class="relative w-10 h-10" role="img" aria-label="loading">
          <div class="absolute w-full h-full">
            <div class="animate-spin animate-duration-3000">
              <ILoad class="w-10" strokeWidth={20} />
            </div>
          </div>
        </div>
        {props?.content && <span>{props?.content}</span>}
      </div>
    );
  },
  { name: 'AkirSpin', props: ['color', 'bgColor', 'content'] },
);
