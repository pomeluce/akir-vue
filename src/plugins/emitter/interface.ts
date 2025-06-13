import { MessageOptions } from 'naive-ui';

interface EmitterMessageType {
  content: string;
  options?: MessageOptions;
}

const messageEmitKey = [
  'MESSAGE:API:AUTHENTICATED',
  'MESSAGE:API:FORBIDDEN',
  'MESSAGE:API:NOT_FOUND',
  'MESSAGE:API:TOO_MANY_REQUESTS',
  'MESSAGE:API:INTERNAL_SERVER_ERROR',
  'MESSAGE:API:DEFAULT',
] as const;

export type EmitterMessageKey = (typeof messageEmitKey)[number];

export type EmitterEvents = {
  'ROUTER:API:UNAUTHORIZED': void;
  'SPIN:OPEN': void;
  'SPIN:CLOSE': void;
} & {
  [K in EmitterMessageKey]: EmitterMessageType;
};
