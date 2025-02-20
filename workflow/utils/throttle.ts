const target = typeof window === 'undefined' ? globalThis : window;

const raf = target.requestAnimationFrame;
const caf = target.cancelAnimationFrame;

export const throttleByRaf = (cb: (...args: any[]) => void) => {
  let timer = 0;

  const throttle = (...args: any[]): void => {
    if (timer) caf(timer);
    timer = raf(() => {
      cb(...args);
      timer = 0;
    });
  };

  throttle.cancel = () => {
    caf(timer);
    timer = 0;
  };

  return throttle;
};
