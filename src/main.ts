import App from '@/App.tsx';
import plugins from '@/plugins';

const bootstrap = (): void => {
  // 创建 vue 实例对象
  const app = createApp(App);
  // 挂载插件
  plugins(app);
  // 挂载到 app 中
  app.mount('#app');
};

bootstrap();
