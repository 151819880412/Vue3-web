import { AppRouteRecordRaw } from '../types';
export const PAGE_NOT_FOUND_NAME = 'PageNotFound';
const AppLayout = () => import('@/views/layout/AppLayout.vue')
const notFound = () => import('@/views/404/404.vue')

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: AppLayout,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: notFound,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
};

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  component: AppLayout,
  name: 'RedirectTo',
  meta: {
    title: 'Redirect',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'Redirect',
      component: () => import('@/components/Redirect/redirect.vue'),
      meta: {
        title: 'Redirect',
        hideBreadcrumb: true,
      },
    },
  ],
};

export const ERROR_LOG_ROUTE: AppRouteRecordRaw = {
  path: '/error-log',
  name: 'ErrorLog',
  component: AppLayout,
  redirect: '/error-log/list',
  meta: {
    title: 'ErrorLog',
    hideBreadcrumb: true,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'list',
      name: 'ErrorLogList',
      // component: () => import('/@/views/sys/error-log/index.vue'),
      meta: {
        title: 'Redirect',
        hideBreadcrumb: true,
        currentActiveMenu: '/error-log',
      },
    },
  ],
};
