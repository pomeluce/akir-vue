import { ISpinProps, MeagleSpin } from '@/components';

export function useSpin(options?: ISpinProps) {
  const vNode: HTMLElement = document.createElement('div');
  const instance = createApp(MeagleSpin, { options }).mount(vNode);

  document.body.appendChild(instance.$el);

  return {
    close: () => {
      instance.$el?.remove();
    },
  };
}

export type MeagleSpinInstance = ReturnType<typeof useSpin>;
