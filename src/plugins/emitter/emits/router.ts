import { Router } from 'vue-router';
import emitter from '..';

const { remove } = useStorage();

export default (router: Router) => {
  emitter.on('ROUTER:UNAUTHORIZED', () => {
    remove(CacheKey.ACCESS_TOKEN);
    router.push({ name: RouteName.LOGIN });
  });
};
