// 账户管理
import {
  getWsInfo,
  modifyPhone,
  modifyPwd,
  managementlist,
  createWs,
  editWs,
  managementinformation,
  managementemployees
} from '@/api/account'

import { sendVerifyCode } from '@/api/user'

import { Message } from 'element-ui'

const state = {
  accountInfo: {},
  managementemployeesInfo: {},
  wsInfo: {}
}
const mutations = {
  GET_EMPLOYES(state, data) {
    state.managementemployeesInfo = data
  },
  SETWSINFO(state, data) {
    state.wsInfo = data
  }
}

const actions = {
  editWs({ commit }, params) {
    return new Promise((resolve, reject) => {
      editWs(params).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  createWs({ commit }, params) {
    return new Promise((resolve, reject) => {
      createWs(params).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getWsInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      getWsInfo(params).then(res => {
        commit('SETWSINFO', res.data)
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 账号修改手机号
  modifyPhone({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      modifyPhone(data).then(response => {
        if (response.code === 200) {
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 账号修改密码
  modifyPwd({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      modifyPwd(data).then(response => {
        // if (response.code === 200) {
        //   Message.success(response.message)
        // }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  sendVerifyCode({ commit }, data) {
    return new Promise((resolve, reject) => {
      sendVerifyCode(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // WS分页列表
  managementlist({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      managementlist(data).then(response => {
        if (response.code === 200) {
          console.log(response)
          Message.success(response.message)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // ws首次登录完善信息
  managementinformation({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      managementinformation(data).then(response => {
        if (response.code === 200) {
          console.log(response)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // ABI员工信息
  managementemployees({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      managementemployees(data).then(response => {
        if (response.code === 200) {
          commit('GET_EMPLOYES', response.data)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
