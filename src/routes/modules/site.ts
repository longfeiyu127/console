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
    path: '/site',
    component: Layout,
    redirect: '/site/sitemap',
    name: 'Site',
    meta: { title: '网站', icon: 'table' },
    children: [
      {
        path: 'sitemap',
        name: 'Sitemap',
        component: () =>
          import(
            /* webpackChunkName: "console" */ '@/views/site/sitemap/index.vue'
          ),
        meta: { title: '网站地图', icon: 'tree' }
      },
      {
        path: 'sitePermission',
        name: 'sitePermission',
        component: () =>
          import(
            /* webpackChunkName: "console" */ '@/views/site/sitePermission/index.vue'
          ),
        meta: { title: '功能权限', icon: 'tree' }
      }
    ]
  }
]
