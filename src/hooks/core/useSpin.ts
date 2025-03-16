import { AkirSpinProps, AkirSpin } from '@/components';

export function useSpin(options?: AkirSpinProps) {
  const vNode: HTMLElement = document.createElement('div');
  const instance = createApp(AkirSpin, { ...options }).mount(vNode);

  document.body.appendChild(instance.$el);

  return {
    close: () => {
      instance.$el?.remove();
    },
  };
}
