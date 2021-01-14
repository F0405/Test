import Layout from '@/layout'

const goodsRouter = {
  path: '/products',
  component: Layout,
  redirect: '/goods/publish',
  name: 'Goods',
  meta: {
    title: 'Goods',
    icon: 'table'
  },
  children: [
    {
      path: 'publish',
      component: () => import('@/views/goods/publish-mngmt'),
      name: 'GoodsPublishMngmt',
      meta: { title: 'publishMngmt' },
      showOnlyOne: true
    },
    {
      path: 'release',
      component: () => import('@/views/goods/components/goodsReleased/index'),
      name: 'Archives-mngmt',
      meta: { title: '商品发布', noCache: true, activeMenu: '/products/publish' },
      hidden: true
    },
    {
      path: 'archive',
      component: () => import('@/views/goods/archives-mngmt'),
      name: 'GoodsArchivesMngmt',
      meta: { title: 'archivesMngmt' },
      showOnlyOne: true
    },
    {
      path: 'creation',
      component: () => import('@/views/goods/components/creation-mngmt/index'),
      name: 'Creation-mngmt',
      meta: { title: '手工创建商品档案', noCache: true, activeMenu: '/products/archive' },
      hidden: true
    }
  ]
}
export default goodsRouter
