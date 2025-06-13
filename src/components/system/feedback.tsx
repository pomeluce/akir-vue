import { AkirSpinInstance } from '@/hooks/types';
import { emitter, EmitterMessageKey } from '@/plugins';

export default defineComponent<{}>(() => {
  const message = useMessage();
  const modal = useModal();

  const keys: EmitterMessageKey[] = [
    'MESSAGE:API:AUTHENTICATED',
    'MESSAGE:API:FORBIDDEN',
    'MESSAGE:API:NOT_FOUND',
    'MESSAGE:API:TOO_MANY_REQUESTS',
    'MESSAGE:API:INTERNAL_SERVER_ERROR',
    'MESSAGE:API:DEFAULT',
  ];

  emitter.registerAll(keys, ({ content, options }) => message.create(content, options));

  let spin: AkirSpinInstance | null = null;
  emitter.on('SPIN:OPEN', () => {
    if (spin) spin.close();
    spin = useSpin();
  });
  emitter.on('SPIN:CLOSE', () => {
    if (spin) spin.close();
  });

  window.$message = message;
  window.$modal = modal;

  return () => <></>;
});
