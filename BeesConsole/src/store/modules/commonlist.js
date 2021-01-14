import { getCommonList, deleteCommon, postCommonList, detailCommonList, getTyroCommon } from '@/api/commonlist'
import { Message } from 'element-ui'
const state = {
  commonList: {
    total: 0,
    size: 0,
    current: 0,
    records: []
  },
  tyroCommon: {}
}

const mutations = {
  GET_COMMONLIST: (state, data) => {
    state.commonList.total = data.total * 1
    state.commonList.size = data.size
    state.commonList.current = data.pageNum
    state.commonList.records = data.list
  },
  GET_TYROCOMMON: (state, data) => {
    state.tyroCommon = data
    // console.log(data)
  }
}

const actions = {
  getCommonList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getCommonList(data).then(res => {
        if (res.code === 200) {
          console.log(res.data)
          commit('GET_COMMONLIST', res.data)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除
  deleteCommon({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      deleteCommon(id).then(res => {
        if (res.code === 200) {
          console.log(res)
          dispatch('getCommonList')
          Message.success('删除成功')
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加
  postCommonList({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      postCommonList(data).then(res => {
        if (res.code === 200) {
          console.log(res)
          Message.success('添加成功')
          dispatch('getCommonList')
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 编辑数据
  getTyroCommon({ commit }, data) {
    return new Promise((resolve, reject) => {
      getTyroCommon(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          commit('GET_TYROCOMMON', res.data)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 编辑
  detailCommonList({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      detailCommonList(data).then(res => {
        if (res.code === 200) {
          dispatch('getCommonList')
          Message.success('编辑成功')
        }
        resolve(data)
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
