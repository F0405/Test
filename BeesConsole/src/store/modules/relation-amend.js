import {
  getStatusList,
  getPocList,
  getM1List,
  M1change
} from '@/api/relation-amend'

const state = {
  statusOptions: [],
  saleList: {
    total: 0,
    current: 0,
    size: 0,
    records: []
  }
  // __root__: {},
  // principalShow: false
  // m1List: []
}

const mutations = {
  GET_STATUS: (state, data) => {
    state.statusOptions = data
  },
  GET_POC: (state, data) => {
    state.saleList = data
  }
  // M1_CHANGE: (state, data) => {
  //   state.__root__ = data
  // },
  // GET_M1_LIST: (state, data) => {
  //   state.m1List = data
  // }
}

const actions = {
  // 售点状态列表
  getStatusList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getStatusList(data).then(response => {
        // console.log('状态列表', response.data)
        commit('GET_STATUS', response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 售点列表数据
  getPocList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getPocList(data).then(response => {
        // console.log('售点列表', response.data)
        commit('GET_POC', response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取M1负责人列表
  getM1List({ commit }, data) {
    return new Promise((resolve, reject) => {
      getM1List(data).then(response => {
        // console.log('M1列表', response)
        // commit('GET_M1_LIST', response.data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 批量更改售点负责人
  M1change({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      M1change(data).then(response => {
        resolve(response)
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
