import Layout from '@/layout'

const mallRouter = {
  path: '/mall',
  component: Layout,
  redirect: '/mall/order',
  name: 'Mall',
  meta: {
    title: 'Mall',
    icon: 'shopping'
  },
  children: [
    {
      path: 'order',
      component: () => import('@/views/mall/order-mngmt'),
      name: 'OrderMngmt',
      meta: { title: 'orderMngmt' },
      showOnlyOne: true
    },
    {
      path: 'activity',
      component: () => import('@/views/mall/activity-mngmt'),
      name: 'ActivityMngmt',
      meta: { title: 'activityMngmt' },
      showOnlyOne: true
    },
    {
      path: 'creation',
      component: () => import('@/views/mall/create-activities'),
      name: 'ActivityMngmt',
      meta: { title: '创建活动', noCache: true, activeMenu: '/mall/activity' },
      hidden: true
    },
    {
      path: 'detail',
      component: () => import('@/views/mall/detail'),
      name: 'ActivityMngmt',
      meta: { title: '订单详情', noCache: true, activeMenu: '/mall/order' },
      hidden: true
    }
  ]
}
export default mallRouter
