import { RouteRecordRaw } from 'vue-router';
import admin from './admin';
import auth from './auth';
import error from './error';
import front from './front';
import redirect from './redirect';
import unknown from './unknown';

export default [front, auth, error, ...admin, redirect, unknown] as RouteRecordRaw[];
