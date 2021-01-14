import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import mallRouter from './modules/mall'
import goodsRouter from './modules/goods'
import disposeRouter from './modules/dispose'
import operationRouter from './modules/operation'
import customerRouter from './modules/customer'
import reviewRouter from './modules/review'
import settingRouter from './modules/setting'
// import propertyRouter from './modules/property'
import management from './modules/management'
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', noCache: false, icon: 'dashboard', affix: true }
      }
    ]
  },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
  // {
  //   path: '/publish-mngmt',
  //   component: Layout,
  //   redirect: '/publish-mngmt/goodsReleased',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'goodsReleased',
  //       component: () => import('@/views/goods/components/goodsReleased/index'),
  //       name: 'Archives-mngmt',
  //       meta: { title: '商品发布', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/banner-set',
  //   component: Layout,
  //   redirect: '/banner-set/banneradd',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'banneradd',
  //       component: () => import('@/views/dispose/components/banner-set/components/banneradd'),
  //       name: 'Banneradd',
  //       meta: { title: '资源位配置添加', noCache: true }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 */
export const asyncRoutes = [
  management, // 账户管理
  mallRouter, // 商城管理
  goodsRouter, // 商品管理
  operationRouter, // 运营
  disposeRouter, // 配置
  customerRouter, // 客户管理
  reviewRouter, // 审核
  settingRouter, // 设置
  // propertyRouter, // 商品属性管理

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

router.beforeEach((to, from, next) => {
  // console.log('MMHH', to, from)
  next()
})

export default router
