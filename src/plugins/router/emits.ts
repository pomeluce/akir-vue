import { Router } from 'vue-router';
import emitter from '../emitter';

const { remove } = useStorage();

export default (router: Router) => {
  emitter.on('ROUTER:API:UNAUTHORIZED', () => {
    remove(CacheKey.ACCESS_TOKEN);
    router.push({ name: RouteName.LOGIN });
  });
};
