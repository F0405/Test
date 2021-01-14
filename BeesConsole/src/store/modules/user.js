import { login, loginBySmscode, logout, loginByOther, getABIInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import Cookies from 'js-cookie'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  abiInfo: {},
  dealer_id: null // 二级销售
}

const getters = {
  // 1: abi运营  2: ws运营
  roleId: state => {
    if (state.token) {
      const userInfo = JSON.parse(Cookies.get('user_info'))
      if (userInfo && userInfo.consoleUserInfo && userInfo.consoleUserInfo.roleId) {
        return userInfo.consoleUserInfo.roleId
      }
    }
    return undefined
  },
  userInfo: state => {
    if (state.token) {
      const userInfo = JSON.parse(Cookies.get('user_info'))
      if (userInfo && userInfo.consoleUserInfo) {
        return userInfo.consoleUserInfo
      }
    }
    return undefined
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ABIINFO: (state, v) => {
    state.abiInfo = v
  }
}

const actions = {
  updateUserinfo({ commit }, info) {
    Cookies.set('user_info', info)
  },
  // 写在方法actions对象中
  setRole({ commit }, roles) {
    return new Promise(resolve => {
      commit('SET_ROLES', roles)
      resolve()
    })
  },
  // user login
  login({ commit }, userInfo) {
    const { userNameOrPhone, password } = userInfo
    Cookies.remove('AuthenToken') // 移除之前登录token
    Cookies.remove('dealer_id') // 移除下级经销商id
    Cookies.remove('dealer_menus')
    Cookies.remove('user_info')
    return new Promise((resolve, reject) => {
      login({ userNameOrPhone: userNameOrPhone.trim(), password: password }).then(response => {
        const data = response.data
        commit('SET_TOKEN', { token: 'admin-token' })
        Cookies.set('AuthenToken', data.token)
        Cookies.set('user_info', data.userInfo)
        const actived = data.userInfo.consoleUserInfo.roleId === '1' ? '1' : data.userInfo.consoleUserInfo.actived
        Cookies.set('user_actived', actived)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  loginBySmscode({ commit }, userInfo) {
    const { phone, smsCode } = userInfo
    Cookies.remove('AuthenToken') // 移除之前登录token
    Cookies.remove('dealer_id') // 移除下级经销商id
    Cookies.remove('dealer_menus')
    Cookies.remove('user_info')
    return new Promise((resolve, reject) => {
      loginBySmscode({ phone: phone.trim(), smsCode: smsCode }).then(response => {
        const data = response.data
        commit('SET_TOKEN', { token: 'admin-token' })
        Cookies.set('AuthenToken', data.token)
        Cookies.set('user_info', data.userInfo)
        setToken('admin-token')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 切换身份
  switchRoles({ commit, state }) {
    Cookies.remove('dealer_id') // 移除下级经销商id
    return new Promise((resolve, reject) => {
      loginByOther().then(response => {
        // 更新侧边栏   显示返回
        console.log(response)
        // const data = response.data
        Cookies.set('dealer_id', '1')
        Cookies.set('dealer_menus', response.data)
        location.reload()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 退出经销商身份
  logoutByDealer() {
    // 清楚cookie
    Cookies.remove('dealer_id') // 移除下级经销商id
    Cookies.remove('dealer_menus')
    Cookies.remove('user_info')
    location.reload()
  },
  getABIInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getABIInfo().then(res => {
        commit('SET_ABIINFO', res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = {
        status: 200,
        code: 200,
        data: {
          avatar: 'https://ignite-upload.oss-cn-shanghai.aliyuncs.com/dev/ce3653ed-a2ea-4185-b525-be72fc5dead3sh.jpg',
          introduction: 'I am a super administrator',
          name: 'Super Admin',
          roles: ['admin']
        }
      }
      commit('SET_NAME', data.data.name)
      commit('SET_AVATAR', data.data.avatar)
      commit('SET_INTRODUCTION', data.data.introduction)
      commit('SET_ROLES', data.data.roles)
      resolve(data.data)
    })
  },

  erasureUserInfo({ commit }) {
    Cookies.remove('AuthenToken') // 移除之前登录token
    Cookies.remove('dealer_id') // 移除下级经销商id
    Cookies.remove('user_info') //
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        Cookies.remove('AuthenToken') // 移除之前登录token
        Cookies.remove('dealer_id') // 移除下级经销商id
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        Cookies.remove('AuthenToken') // 移除之前登录token
        Cookies.remove('dealer_id') // 移除下级经销商id
        Cookies.remove('dealer_menus')
        Cookies.remove('Admin-Token')
        Cookies.remove('user_info')
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        console.log(this)
        // this.$router.push({ path:'/'})
        location.reload()
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }

}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}
