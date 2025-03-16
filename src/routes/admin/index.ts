import { RouteRecordRaw } from 'vue-router';
import dashboard from './dashboard';
import system from './system';
import workflow from './workflow';

export default [{ path: '/admin', name: RouteName.ADMIN, redirect: { name: RouteName.DASHBOARD_CONSOLE } }, dashboard, system, workflow] as RouteRecordRaw[];
