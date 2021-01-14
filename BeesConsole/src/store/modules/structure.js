import request from '@/utils/request'
import { removeLetter } from '@/utils/abiExtension'

/*
  usage:
  import { mapGetters } from 'vuex'

  ...<template>
  <el-cascader
      v-model="model"
      :options="optionRegion"
      style="width: 300px"
      @change="handleChange"
    />
  ...</template>

  ... <script>
  computed: {
    ...mapGetters('structure', ['optionRegion', 'optionArea', ''opetionChannel])
  },
  ...</script>

*/

const reduceBU = (arr) => {
  return arr.reduce((acc, cur) => {
    let children
    if (cur.subOrgList) {
      children = reduceBU(cur.subOrgList)
    }
    acc.push({ value: parseInt(cur.id), label: removeLetter(cur.name), children: children && children.length ? children : undefined })
    return acc
  }, [])
}

const mapBU = (arr) => {
  return arr.reduce((acc, cur) => {
    acc[cur.value] = cur.label
    if (cur.children) { acc = Object.assign(acc, mapBU(cur.children)) }
    return acc
  }, {})
}
const reduceArea = (arr) => {
  return arr.reduce((acc, cur) => {
    let children
    if (cur.children) {
      children = reduceArea(cur.children)
    }
    acc.push({ value: parseInt(cur.areaCode), label: cur.areaName, children: children && children.length ? children : undefined })
    return acc
  }, [])
}
const mapArea = (arr) => {
  return arr.reduce((acc, cur) => {
    acc[cur.value] = cur.label
    if (cur.children) { acc = Object.assign(acc, mapArea(cur.children)) }
    return acc
  }, {})
}
const mapChannel = (arr) => {
  return arr.reduce((acc, cur) => {
    acc[cur.value] = cur.label
    if (cur.children) { acc = Object.assign(acc, mapChannel(cur.children)) }
    return acc
  }, {})
}
const reduceChannel = (arr) => {
  return arr.reduce((acc, cur) => {
    let children
    if (cur.children) {
      children = reduceChannel(cur.children)
    }
    acc.push({ value: parseInt(cur.channelId), label: removeLetter(cur.channelName), children: children && children.length ? children : undefined })
    return acc
  }, [])
}

const state = {
  allChannel: [],
  buRegionArea: [],
  normalArea: [],
  wsType: [{ name: '一批', value: '1' }, { name: '二批', value: '2' }]
}
const mutations = {
  SET_ALLCHANNEL(state, data) {
    state.allChannel = data
  },
  SET_BUREGIONAREA(state, data) {
    state.buRegionArea = data
  },
  SET_NORMALAREA(state, data) {
    state.normalArea = data
  }
}
const actions = {
  getAllChannels({ commit }) {
    return new Promise((resolve, reject) => {
      request('/ignite/ignite-service/third/basic_channel')
        .then(res => {
          const { data } = res
          const arr = reduceChannel(data)
          commit('SET_ALLCHANNEL', arr)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getAllStruceture({ commit }) {
    return new Promise((resolve, reject) => {
      request('/ignite/ignite-service/third/org_territory')
        .then(res => {
          const { data } = res
          const arr = reduceBU(data)
          commit('SET_BUREGIONAREA', arr)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getBasicArea({ commit }) {
    return new Promise((resolve, reject) => {
      request('/ignite/ignite-service/third/basic-area')
        .then(res => {
          const { data } = res
          const arr = reduceArea(data)
          commit('SET_NORMALAREA', arr)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
const getters = {
  // 销售组织架构
  optionRegion: state => state.buRegionArea,
  optionRegion2: state => {
    const bu = state.buRegionArea
    let ret = []
    for (let index = 0; index < bu.length; index++) {
      const element = bu[index]
      ret = ret.concat(element.children)
    }
    return ret
  },
  regionMap: state => {
    return mapBU(state.buRegionArea)
  },
  //  地理区域 省市区
  optionArea: state => state.normalArea,
  areaMap: state => {
    return mapArea(state.normalArea)
  },
  // 渠道
  opetionChannel: state => state.allChannel,
  channelMap: state => {
    return mapChannel(state.allChannel)
  },
  wsTypeMap: state => {
    return state.wsType.reduce((acc, cur) => {
      acc[cur.value] = cur.name
      return acc
    }, {})
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
