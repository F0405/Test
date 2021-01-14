import Layout from '@/layout'

const customerRouter = {
  path: '/customer',
  component: Layout,
  redirect: '/customer/list',
  name: 'customer',
  meta: {
    title: 'Customer',
    icon: 'list'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/customer/buy-list'),
      name: 'CustomerBuyList',
      meta: { title: 'customerList' },
      showOnlyOne: true
    },
    {
      path: 'detail',
      component: () => import('@/views/customer/sale-detail/index'),
      name: 'Detail',
      hidden: true,
      meta: {
        title: 'customerDetail', icon: 'user', noCache: true, activeMenu: '/customer/list'
      }
    },
    { // 售点公海池
      path: 'sale',
      component: () => import('@/views/customer/sale-common'),
      name: 'SaleCommon',
      meta: { title: 'saleCommon' },
      showOnlyOne: true
    },
    { // M2/运营人员修改M1和POC关系
      path: 'relation',
      component: () => import('@/views/customer/relation-amend'),
      name: 'RelaAmend',
      meta: { title: 'relationAmend' },
      showOnlyOne: true
    }
  ]
}
export default customerRouter
