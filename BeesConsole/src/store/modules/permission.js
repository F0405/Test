import { asyncRoutes, constantRoutes } from '@/router'
import Cookies from 'js-cookie'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      /* /////////////////////////////////////////////// */
      // 获取cookie中用户菜单 -- 删减操作
      // const newroutes = accessedRoutes
      const newroutes = []
      const userinfo = JSON.parse(Cookies.get('user_info'))
      const menus = userinfo.consoleUserInfo.menus
      asyncRoutes.map((v, k) => {
        let userHasPermission = false
        let secondMenu = []
        // if (Cookies.get('dealer_id') && Cookies.get('dealer_menus')) {
        //   menus = JSON.parse(Cookies.get('dealer_menus'))
        // }
        menus.map((vv, kk) => {
          // 具有一级目录权限
          if (v.path === '/' + vv.path) {
            secondMenu = v
            userHasPermission = true
            // 进入二级目录判断权限
            const c = v.children.filter((v1, k1) => {
              const isin = vv.subMenus.filter(v2 => { return v2.path === v1.path })
              return isin.length > 0
            })
            secondMenu.children = c
          }
        })
        if (userHasPermission) {
          newroutes.push(secondMenu)
        }
      })
      /* /////////////////////////////////////////////// */

      commit('SET_ROUTES', newroutes)
      resolve(newroutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
