import { ISpinProps, AkirSpin } from '@/components';

export function useSpin(options?: ISpinProps) {
  const vNode: HTMLElement = document.createElement('div');
  const instance = createApp(AkirSpin, { options }).mount(vNode);

  document.body.appendChild(instance.$el);

  return {
    close: () => {
      instance.$el?.remove();
    },
  };
}

export type AkirSpinInstance = ReturnType<typeof useSpin>;
