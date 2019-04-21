import Layout from '@/views/layout/Layout.vue'

/*
  redirect:                      if `redirect: noredirect`, it won't redirect if click on the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

export default [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/role',
    name: 'Permission',
    meta: { title: '权限', icon: 'lock' },
    children: [
      {
        path: 'role',
        name: 'RolePermission',
        component: () =>
          import(
            /* webpackChunkName: "console" */ '@/views/permission/role.vue'
          ),
        meta: { title: '权限管理', icon: 'lock' }
      }
    ]
  }
]
