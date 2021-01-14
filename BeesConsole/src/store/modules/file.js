import axios from 'axios'
const state = {}
const mutations = {}
const actions = {
  uploadFile({ commit }, data) {
    const param = new FormData()
    param.append('file', data.file)
    return new Promise((resolve, reject) => {
      axios
        .post(`http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/basic-service/file-upload-oss`, param)
        .then(resp => {
          resolve(resp.data)
        })
        .catch(err => {
          reject(err?.response?.data?.message)
        })
    })
  }
}
const getters = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
