import 'vue-router';
import { DefineComponent } from 'vue';

export type RouteMenu = {
  label?: string;
  blank?: string;
  order?: number;
};

declare module 'vue-router' {
  interface RouteMeta {
    auth?: boolean;
    guest?: boolean;
    loginView?: boolean;
    label?: string;
    menu?: RouteMenu;
    prefix?: boolean;
  }
}
