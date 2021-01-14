import {
  getarChivesList,
  getBrandList,
  getClassify,
  deleteBrand,
  getGoodsList,
  getBrandUnit,
  GoodsReleased,
  GoodsEditor,
  newGooodsRecord,
  GooodsRecordEditor,
  GooodsPutaway,
  GooodsSold,
  draft
} from '@/api/goods'
import { Message } from 'element-ui'

const state = {
  archives: {
    total: 0,
    current: 1,
    size: 10,
    records: []
  },
  publish: {
    total: 0,
    current: 1,
    size: 10,
    records: []
  },
  brandList: [],
  classifyList: [],
  brandUnitList: [],
  creationDetail: {},
  detailBrand: '',
  publishEdit: '',
  provinceList: [],
  channelList: [],
  CopyGoods: {},
  imageCon: {
    mainCon: '最多上传3张图片，第一张为主图，其余为详情页轮播图，上传图片为正方形，建议尺寸：750*750像素以上，可拖拽图片调整顺序，至少上传一张',
    detailCon: '最多上传3张图片，宽度710px1200px像素以内，可拖拽图片调整顺序，至少上传一张',
    shareCon: '最多上传1张图片，建议尺寸：750px*750px像素以上'
  }
}
const mutations = {
  GET_ARCHIVES: (state, data) => {
    // console.log(data)
    state.archives.records = data.list
    state.archives.total = data.total
    state.archives.current = data.pageNum
    state.archives.size = data.pageSize
  },
  GET_BRAND: (state, data) => {
    state.brandList = data
  },
  GET_CLASSIFY: (state, data) => {
    state.classifyList = data
  },
  GET_GOODSLIST: (state, data) => {
    // console.log(data)
    state.publish.records = data.list
    state.publish.total = data.total
    state.publish.current = data.pageNum
    state.publish.size = data.size
  },
  GET_BRANDUNIT: (state, data) => {
    state.brandUnitList = data
  },
  EDIT_DETAIL: (state, data) => {
    state.creationDetail = data
  },
  GET_DETAILBRAND: (state, data) => {
    state.detailBrand = data
    // console.log(data)
  },
  GET_ISSUEEDIT: (state, data) => {
    state.publishEdit = data
  },
  GET_PROVINCES: (state, data) => {
    state.provinceList = data
  },
  GET_CHANNEL: (state, data) => {
    state.channelList = data
  },
  GET_COPYGOODS: (state, data) => {
    state.CopyGoods = data
  }
}

const actions = {
  // 商品档案列表
  getarChivesList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getarChivesList(data).then(response => {
        // console.log(response)
        commit('GET_ARCHIVES', response.result)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品品牌列表
  getBrandList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getBrandList(data).then(response => {
        // console.log(response)
        commit('GET_BRAND', response.result)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品分类
  getClassify({ commit }, data) {
    return new Promise((resolve, reject) => {
      getClassify(data).then(response => {
        // console.log(response.result)
        commit('GET_CLASSIFY', response.result)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品档案新增
  newGooodsRecord({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      newGooodsRecord(data).then(response => {
        console.log(response)
        if (response.code === 200) {
          Message.success('档案新增成功')
          dispatch('getarChivesList')
        } else {
          Message.error('档案新增失败')
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品档案编辑
  GooodsRecordEditor({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      GooodsRecordEditor(data).then(response => {
        if (response.code === 200) {
          Message.success('档案编辑成功')
          dispatch('getarChivesList')
        } else {
          Message.error('档案编辑失败')
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除档案
  deleteBrand({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      deleteBrand(data).then(response => {
        console.log(response)
        if (response.code === 200) {
          Message.success('删除成功')
          dispatch('getarChivesList')
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品发布列表
  getGoodsList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getGoodsList(data).then(response => {
        // console.log(response)
        commit('GET_GOODSLIST', response.result)
        resolve()
      }).catch(error => {
        reject(error)
        Message.error(error.message)
      })
    })
  },
  // 商品保存草稿
  draft({ commit }, data) {
    return new Promise((resolve, reject) => {
      draft(data).then(res => {
        console.log(res)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品单位
  getBrandUnit({ commit }, data) {
    return new Promise((resolve, reject) => {
      getBrandUnit(data).then(response => {
        // console.log(response)
        commit('GET_BRANDUNIT', response.result)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 档案编辑条
  getEditDetail({ commit }, data) {
    return new Promise((reslove, reject) => {
      commit('EDIT_DETAIL', data)
      reslove()
    })
  },

  // 商品发布信息
  getIssueEdit({ commit }, data) {
    return new Promise((reslove, reject) => {
      // console.log(data)
      commit('GET_ISSUEEDIT', data)
      reslove()
    })
  },
  // 商品新增发布
  GoodsReleased({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      GoodsReleased(data).then(response => {
        console.log(response)
        if (response.code === 200) {
          Message.success('新增发布成功')
          dispatch('getGoodsList')
        } else {
          Message.error('新增发布失败')
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品发布编辑
  GoodsEditor({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      GoodsEditor(data).then(response => {
        console.log(response)
        if (response.code === 200) {
          Message.success('编辑成功')
          dispatch('getGoodsList')
        } else {
          Message.error('编辑失败')
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品发布上架
  GooodsPutaway({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      GooodsPutaway(data).then(response => {
        if (response.code === 200) {
          Message.success('上架成功')
          dispatch('getGoodsList')
        } else {
          Message.error('上架失败')
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 商品发布下架
  GooodsSold({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      GooodsSold(data).then(response => {
        if (response.code === 200) {
          Message.success('下架成功')
          dispatch('getGoodsList')
        } else {
          Message.error('下架失败')
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getTreeChannel({ dispatch }, data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].children.length < 1) {
        data[i].children = undefined
      } else {
        dispatch('getTreeChannel', data[i].children)
      }
    }
    return data
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
