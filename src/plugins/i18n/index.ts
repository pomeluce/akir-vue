import { App } from 'vue';
import { createI18n } from 'vue-i18n';
import zh_CN from './locales/zh_CN';

const defaultLocale = 'zh_CN';

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  messages: {
    zh_CN: zh_CN,
    en_US: {},
  },
});

const setup = (app: App) => {
  app.use(i18n);
};
export { setup };
