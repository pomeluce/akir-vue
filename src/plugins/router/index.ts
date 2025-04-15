import { App } from 'vue';
import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router';
import { AxiosError } from 'axios';
import routes from '@/routes';
import emits from './emits';
import emitter from '../emitter';

/* 创建路由实例, 并设置路由规则 */
const router = createRouter({
  // 指定路由模式: html5 模式
  history: createWebHistory(),
  routes,
});

/* 初始化变量 */
let initial = false;

/* 全局路由导航, 验证登录状态 */
router.beforeEach(async (to: RouteLocationNormalized) => {
  const { set } = useStorage();
  const { isAuthenticated } = useAuth();
  const { handleAxiosError } = useError();

  // 初始化
  if (!initial) {
    try {
      initial = true;
      await Promise.all([useUserStore().getCurrentUser(), useUserStore().getMenuList()]);
    } catch (e) {
      handleAxiosError(e as AxiosError);
    }
  }

  // 保护内容需要登录验证
  if (to.meta.auth && !isAuthenticated()) {
    set(CacheKey.REDIRECT_ROUTE_NAME, to.fullPath);
    emitter.emit('MESSAGE:API:AUTHENTICATED', { content: '当前未登录或登录已过期', options: { type: 'info', duration: 2000 } });
    return { name: RouteName.LOGIN };
  }

  // 认证页面, 已登录跳转到首页
  if (to.meta.guest && isAuthenticated()) return { name: RouteName.HOME };

  // 登录页面, 重置初始化信息
  if (to.meta.loginView) initial = false;
});

/* 路由错误处理 */
router.onError(error => {
  console.error('error loading router: ', error);
  router.push({ name: RouteName.ERROR_500 });
});

/* 订阅路由事件 */
emits(router);

const setup = (app: App) => {
  app.use(router);
};

export default router;

export { setup };
