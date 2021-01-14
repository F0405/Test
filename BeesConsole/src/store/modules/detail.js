import { getDetail } from '@/api/detail'
const state = {
  homeToplist: {},
  homeMiddle: {}
}

const mutations = {
  GET_HOMETOPLIST: (state, data) => {
    // console.log(data)
    state.homeToplist = data
  },
  GET_HOMEMIDDLE: (state, data) => {
    console.log(data)
    state.homeMiddle = data
  }
}

const actions = {
  getHomeToplist({ commit }, data) {
    return new Promise((resolve, reject) => {
      getDetail(data).then(res => {
        commit('GET_HOMETOPLIST', res.data)
      })
      resolve()
    })
  },
  getHomeMidddle({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('GET_HOMEMIDDLE', data)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
