import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, getActived } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
// import { asyncRoutes, constantRoutes } from '@/router'
// import Cookies from 'js-cookie'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

// eslint-disable-next-line space-before-function-paren
router.beforeEach(async (to, from, next) => {
  if (from.path === '/account/complete' && getActived() === '0' && to.path !== '/dashboard' && to.path !== '/login') {
    Message.closeAll()
    Message({
      message: '请先完善账户信息', // to.path
      type: 'error',
      duration: 5 * 1000
    })
    return
  }
  // console.log(to, '拦截路由请求，重置localStorage')
  if (to.fullPath !== '/config/resource?v=1' || to.fullPath !== '/config/banneradd?type=edit') {
    localStorage.setItem('activeName', 0) // activeName
  }
  if (to.fullPath !== '/operate/list?v=1') {
    localStorage.setItem('inventory', 0) // inventory
  }
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer']
          const { roles } = await store.dispatch('user/getInfo')
          // generate accessible routes map based on roles
          store.dispatch('permission/generateRoutes', roles).then(res => {
            router.addRoutes(res)
            next({ ...to, replace: true })
          })
          // dynamically add accessible routes
          // router.addRoutes(accessRoutes)
          // next({ ...to, replace: true })

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
