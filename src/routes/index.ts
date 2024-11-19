import { RouteRecordRaw } from 'vue-router';
import admin from './admin';
import auth from './auth';
import error from './error';
import front from './front';
import unknown from './unknown';

export default [front, auth, error, ...admin, unknown] as RouteRecordRaw[];
