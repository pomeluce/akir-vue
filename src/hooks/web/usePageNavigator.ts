import { RouteLocationRaw, Router, RouteRecordNameGeneric } from 'vue-router';

export default () => {
  const router = useRouter();

  const navigate = (to: RouteLocationRaw, isReplace: boolean = false, _router?: Router) => {
    const { replace, push } = _router || router;

    if (!to) {
      console.warn('navigate target cannot be undefined | null');
      return;
    }
    return isReplace ? replace(to) : push(to);
  };

  const redirect = (_router?: Router) => {
    const { replace, currentRoute } = _router || router;
    const { query, name, fullPath } = unref(currentRoute.value);

    return new Promise<boolean>(resolve => {
      if (name === RouteName.REDIRECT) {
        resolve(false);
        return;
      }

      replace({ path: '/redirect' + fullPath, query }).then(() => resolve(true));
    });
  };

  const openRoute = (name: RouteRecordNameGeneric, target?: string, features?: string) => {
    window.open(router.resolve({ name }).fullPath, target, features);
  };

  return { navigate, redirect, openRoute };
};
