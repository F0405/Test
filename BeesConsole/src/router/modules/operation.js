import Layout from '@/layout'

const mallRouter = {
  path: '/operate',
  component: Layout,
  redirect: '/operate/list',
  name: 'Operate',
  meta: {
    title: 'Operate',
    icon: 'guide'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/operate/common-list'),
      name: 'OperateCommonList',
      meta: { title: 'commonList' },
      showOnlyOne: true
    },
    {
      path: 'inventory',
      component: () => import('@/views/operate/components/inventory'),
      name: 'Inventory',
      meta: { title: '添加清单' },
      hidden: true
    }
  ]
}
export default mallRouter
