import Layout from '@/layout'

const goodsRouter = {
  path: '/property',
  component: Layout,
  redirect: '/property/brand',
  name: 'property',
  meta: {
    title: '商品属性管理',
    icon: 'link'
  },
  children: [
    {
      path: 'brand',
      component: () => import('@/views/property/brand'),
      name: 'brand',
      meta: { title: '商品品牌设置' }
    },
    {
      path: 'company',
      component: () => import('@/views/property/company'),
      name: 'company',
      meta: { title: '商品单位设置' }
    },
    {
      path: 'filter',
      component: () => import('@/views/property/filter'),
      name: 'filter',
      meta: { title: '商品分类设置' }
    }
  ]
}
export default goodsRouter
