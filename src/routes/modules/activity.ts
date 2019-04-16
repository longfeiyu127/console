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

export default {
  path: '/activity',
  component: Layout,
  redirect: '/activity/console',
  name: 'Activity',
  meta: { title: '活动', icon: 'example' },
  children: [
    {
      path: 'console',
      name: 'Console',
      component: () =>
        import(
          /* webpackChunkName: "console" */ '@/views/activity/console.vue'
        ),
      meta: { title: '抽奖后台', icon: 'example' }
    },
    {
      path: 'tree',
      name: 'screen',
      component: () =>
        import(/* webpackChunkName: "tree" */ '@/views/tree/index.vue'),
      meta: { title: '抽奖后台', icon: 'tree', hidden: true }
    }
  ]
}
