import { App } from 'vue';
import { createPinia } from 'pinia';

const setup = (app: App) => {
  // 挂载 pina
  app.use(createPinia());
};

export { setup };
