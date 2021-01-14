import Layout from '@/layout'

const customerRouter = {
  path: '/check',
  component: Layout,
  redirect: '/check/poc',
  name: 'Review',
  meta: {
    title: 'Review',
    icon: 'eye'
  },
  children: [
    { // 售点审核
      path: 'poc',
      component: () => import('@/views/review/sale-audite'),
      name: 'Audite',
      meta: { title: 'saleAudite' },
      showOnlyOne: true
    },
    { // 关店审核
      path: 'colse',
      component: () => import('@/views/review/shop-close'),
      name: 'ShopClose',
      meta: { title: 'shopClose' },
      showOnlyOne: true
    }
  ]
}
export default customerRouter
