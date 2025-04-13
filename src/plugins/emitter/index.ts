import mitt from 'mitt';

type Events = {
  'ROUTER:UNAUTHORIZED': void;
};

export default mitt<Events>();

export * from './emits';
