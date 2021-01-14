import Layout from '@/layout'

const customerRouter = {
  path: '/setting',
  component: Layout,
  redirect: '/setting/products',
  name: 'Setting',
  meta: {
    title: 'Setting',
    icon: 'excel'
  },
  children: [
    { // 商品设置
      path: 'products',
      component: () => import('@/views/setting/goods-set'),
      name: 'GoodsSet',
      meta: { title: 'goodsSet' },
      showOnlyOne: true
    },
    { // 订单设置
      path: 'order',
      component: () => import('@/views/setting/order-set'),
      name: 'OrderSet',
      meta: { title: 'orderSet' },
      showOnlyOne: true
    },
    {
      path: 'last',
      component: () => import('@/views/setting/least-set'),
      name: 'Last',
      hidden: true,
      meta: { title: '最小起送量' },
      showOnlyOne: true

    }
  ]
}
export default customerRouter
