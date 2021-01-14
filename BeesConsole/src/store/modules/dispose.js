import { getPageList } from '@/api/dispose'
// import { Message } from 'element-ui'
const state = {
  pageList: {
    total: 0,
    size: 0,
    current: 0,
    records: []
  },
  pageType: [
    {
      id: 0,
      name: '商城首页'
    },
    {
      id: 1,
      name: '商品详情页'
    },
    {
      id: 2,
      name: '一键下单页'
    },
    {
      id: 3,
      name: '购物车页'
    },
    {
      id: 4,
      name: '我的页'
    },
    {
      id: 5,
      name: '活动专享页'
    },
    {
      id: 6,
      name: '不可跳转'
    }
  ]
}

const mutations = {
  GET_PAGELIST: (state, data) => {
    state.pageList.total = data.total
    state.pageList.size = data.size
    state.pageList.current = data.current
    state.pageList.records = data.records
  }
}

const actions = {
  // 数据
  getPageList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getPageList(data).then(res => {
        if (res.code === 200) {
          console.log(res.data)
          commit('GET_PAGELIST', res.data)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
  // 删除Banner
  // deleteBanner({ dispatch }, id) {
  //   return new Promise((resolve, reject) => {
  //     deleteBanner(id).then(res => {
  //       console.log(res)
  //       if (res.code === 200) {
  //         Message.success('删除成功')
  //         dispatch('getPageList')
  //       }
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
