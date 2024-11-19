import 'vue-router';
import { DefineComponent } from 'vue';

declare module 'vue-router' {
  interface RouteMeta {
    auth?: boolean;
    guest?: boolean;
    loginView?: boolean;
    label?: string;
    target?: string;
  }
}
