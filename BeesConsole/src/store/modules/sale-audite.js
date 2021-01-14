// 售点审核
import {
  getAudite,
  salePass,
  saleQuite
} from '@/api/sale-audite'
import { Message } from 'element-ui'

const state = {
  auditeList: {
    total: 0,
    current: 0,
    size: 0,
    records: []
  },
  __root__: [],
  quiteShow: false,
  rejectSale: []
}

const mutations = {
  GET_AUDITE: (state, data) => {
    state.auditeList = data
  },
  // SALE_PASS: (state, data) => {
  //   state.__root__ = [...data]
  // },
  QUITE_SHOW: (state, data) => {
    state.quiteShow = data
  }
}

const actions = {
  // 售点列表数据
  getAudite({ commit }, data) {
    return new Promise((resolve, reject) => {
      getAudite(data).then(response => {
        console.log('售点审核页面售点列表', response.data)
        commit('GET_AUDITE', response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 售点通过
  salePass({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      salePass(data).then(response => {
        console.log('售点通过', response)
        // commit('SALE_PASS', response.data)
        if (response.code === 200) {
          Message.success('请求成功')
          dispatch('getAudite')
        } else {
          Message.error('请求失败')
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 售点拒绝模态框显示
  showQuite({ commit }, data) {
    commit('QUITE_SHOW', data)
  },

  saleQuite({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      saleQuite(data).then(response => {
        console.log('售点退回', response)
        if (response.code === 200) {
          Message.success('请求成功')
          commit('QUITE_SHOW', false)
          dispatch('getAudite')
        } else {
          Message.error('请求失败')
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

