import { ISpinProps, FlxSpin } from '@/components';

export const useSpin = (options?: ISpinProps) => {
  const vNode: HTMLElement = document.createElement('div');
  const instance = createApp(FlxSpin, { options }).mount(vNode);

  document.body.appendChild(instance.$el);

  return {
    close: () => {
      instance.$el?.remove();
    },
  };
};

export type FlxSpinInstance = ReturnType<typeof useLoading>;
