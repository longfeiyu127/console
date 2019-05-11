import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout.vue'
import Activity from './modules/activity'
import Site from './modules/site'
import Permission from './modules/permission'
import { PermissionModule } from '@/store/modules/permission'

Vue.use(Router)

/*
  redirect:                      if `redirect: noredirect`, it won't redirect if click on the breadcrumb
  meta: {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  ...Permission,
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: { hidden: true },
    children: [
      {
        path: 'dashboard',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          )
      }
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () =>
  //         import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () =>
  //         import(/* webpackChunkName: "tree" */ '@/views/tree/index.vue'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () =>
  //         import(/* webpackChunkName: "form" */ '@/views/form/index.vue'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: { title: 'Nested', icon: 'nested' },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "menu1" */ '@/views/nested/menu1/index.vue'
  //         ),
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () =>
  //             import(
  //               /* webpackChunkName: "menu1-1" */ '@/views/nested/menu1/menu1-1/index.vue'
  //             ),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () =>
  //             import(
  //               /* webpackChunkName: "menu1-2" */ '@/views/nested/menu1/menu1-2/index.vue'
  //             ),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () =>
  //                 import(
  //                   /* webpackChunkName: "menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'
  //                 ),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () =>
  //                 import(
  //                   /* webpackChunkName: "menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'
  //                 ),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () =>
  //             import(
  //               /* webpackChunkName: "menu1-3" */ '@/views/nested/menu1/menu1-3/index.vue'
  //             ),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "menu2" */ '@/views/nested/menu2/index.vue'
  //         ),
  //       name: 'Menu2',
  //       meta: { title: 'Menu2' }
  //     }
  //   ]
  // },
  {
    path: '在线服务',
    component: Layout,
    children: [
      {
        path: 'https://www-di1.dev.cmrh.com/ols/html/services/index.html#/index/home',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // ...Permission,
  ...Activity,
  ...Site,
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  // @ts-ignore
  router.matcher = newRouter.matcher // reset router
}

console.log(router)

export const addRoutes = async(roles : string[]) => {
  const accessRoutes: any = await PermissionModule.generateRoutes(roles)
  console.log(accessRoutes)
  router.addRoutes(accessRoutes)
}

export default router
