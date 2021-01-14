import variables from '@/styles/element-variables.less'
import 'element-ui/lib/theme-chalk/index.css'
import defaultSettings from '@/settings'
import {
  getFileList, brandRemove, classification, createBrand, editorBrand, unitList,
  removeunit, addunit, editorunit, selectclassification, deleteclassification, editorclassification, selectunit
} from '@/api/settings'
import { Message } from 'element-ui'
const { showSettings, tagsView, fixedHeader, sidebarLogo, supportPinyinSearch } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings,
  tagsView,
  fixedHeader,
  sidebarLogo,
  supportPinyinSearch,
  tableList: [],
  unliList: [],
  query: {
    total: 0,
    current: 0,
    size: 0
  }
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  GET_ARCHIVES: (state, data) => {
    console.log(data)
    state.tableList = data.result.list
    state.query.total = data.result.total
    state.query.current = data.result.pageNum
    state.query.size = data.result.size
  },
  UNIT_LIST: (state, data) => {
    state.query.total = data.result
    state.query.current = data.current
    state.query.size = data.size
    state.unitList = data.result.list
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  // 商品品牌列表
  getFileList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getFileList(data).then(response => {
        console.log(response, 'data')
        commit('GET_ARCHIVES', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品品牌删除
  brandRemove({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      brandRemove(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品品牌创建
  createBrand({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      createBrand(data).then(response => {
        if (response.code === 200) {
          dispatch('getFileList')
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品品牌编辑
  editorBrand({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      editorBrand(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品单位删除
  removeunit({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      removeunit(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品单位列表
  unitList({ commit }, data) {
    return new Promise((resolve, reject) => {
      unitList(data).then(response => {
        commit('UNIT_LIST', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品单位查询
  selectunit({ commit }, data) {
    return new Promise((resolve, reject) => {
      selectunit(data).then(response => {
        commit('UNIT_LIST', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品单位新增
  addunit({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      addunit(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品单位编辑
  editorunit({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      editorunit(data).then(response => {
        if (response.code === 200) {
          Message.success('编辑成功')
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 创建商品分类
  classification({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      classification(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询商品分类
  selectclassification({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      selectclassification(data).then(response => {
        if (response.code === 200) {
          Message.success(response.message)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除商品分类
  deleteclassification({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      deleteclassification(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 编辑商品分类
  editorclassification({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      editorclassification(data).then(response => {
        if (response.code === 200) {
          Message.success('编辑成功')
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

