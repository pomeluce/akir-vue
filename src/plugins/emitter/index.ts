import mitt, { Emitter } from 'mitt';
import { EmitterEvents } from './interface';

type ExtendedEmitter = Emitter<EmitterEvents> & {
  registerAll<T extends keyof EmitterEvents>(events: T[], handler: (payload: EmitterEvents[T]) => void): void;
};

const emitter = mitt<EmitterEvents>() as ExtendedEmitter;

emitter.registerAll = function <T extends keyof EmitterEvents>(events: T[], handler: (payload: EmitterEvents[T]) => void) {
  events.forEach(event => emitter.on(event, handler));
};
export default emitter;

export type { EmitterMessageKey, EmitterEvents } from './interface';
