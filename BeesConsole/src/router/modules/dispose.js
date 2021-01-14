/* 配置 */
import Layout from '@/layout'

const disposeRouter = {
  path: '/config',
  component: Layout,
  redirect: '/config/resource',
  name: 'Config',
  meta: {
    title: 'Config',
    icon: 'list'
  },
  children: [
    // { /* 商城首页配置 */
    //   path: 'homepage',
    //   component: () => import('@/views/dispose/home-page'),
    //   name: 'DisposeHomePage',
    //   meta: { title: 'homePage' }
    // },
    { /* 资源位配置 */
      path: 'resource',
      component: () => import('@/views/dispose/banner-set'),
      name: 'DisposeBannerSet',
      meta: { title: '资源位配置' },
      showOnlyOne: true
    },
    {
      path: 'banneradd',
      component: () => import('@/views/dispose/components/banner-set/components/banneradd'),
      name: 'Banneradd',
      meta: { title: '资源位配置添加', noCache: true, activeMenu: '/config/resource' },
      hidden: true
    }
  ]
}
export default disposeRouter
