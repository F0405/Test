import {
  navigation
} from '@/api/order'
const state = {
  allCount: '', // 全部
  cancleCount: '', // 已取消
  noSendCount: '', // 代发货
  receiveCount: '', // 已完成
  noReceiveCount: '' // 带送达
}
const mutations = {
  GET_Navigation: (state, data) => {
    state.allCount = data.allCount
    state.cancleCount = data.cancleCount
    state.noSendCount = data.noSendCount
    state.receiveCount = data.receiveCount
    state.noReceiveCount = data.noReceiveCount
    console.log(state, data, '2121')
  }
}

const actions = {
  navigation({ commit }, data) {
    return new Promise((resolve, reject) => {
      navigation(data).then(response => {
        if (response.code === 200) {
          commit('GET_Navigation', response.data)
          resolve()
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
