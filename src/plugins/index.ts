import { App } from 'vue';
import { setup as dayjs } from './dayjs';
import { setup as pinia } from './pinia';
import { setup as router } from './router';
import { setup as tailwind } from './tailwind';
import { setup as vxeTable } from './vxe-table';

const modules = [dayjs, pinia, router, tailwind, vxeTable];
export default (app: App) => {
  modules.map(module => module(app));
};

export { default as http } from './axios';
export { default as router } from './router';
export { default as yup } from './yup';
