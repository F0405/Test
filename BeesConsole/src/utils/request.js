import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'

import errMsgObj from './errObj'

/**
usage:

import request from '@/utils/request'

request({
  url: '/products-service/',
  method: 'GET'
}).then(resp => {
  console.log(resp)
}).catch(err => {
  console.log(err)
})

 */

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
    if (Cookies.get('AuthenToken')) {
      // config.headers['AuthenToken'] = 'e5189acc-d8d3-4f54-9b53-005317ad94b1'
      config.headers['AuthenToken'] = Cookies.get('AuthenToken')
      config.headers['type'] = '1'
    }
    // 如果是用下级销售身份登录，传入下级id
    if (Cookies.get('dealer_id')) {
      // 传入下一级id
      config.headers['dealer_id'] = Cookies.get('dealer_id')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200 &&
      res.code !== 0 &&
      res.code !== '001_0000' &&
      res.status !== 200 &&
      res.status !== 0 &&
      res.status !== '001_0000') {
      if (res.code === 401) {
        store.dispatch('user/logout')
      }
      let errMsg = errMsgObj[res.code] || errMsgObj[res.status] || '网络请求出错'
      if (res.message && res.message.length > 2) {
        errMsg = res.message
      }
      Message.closeAll()
      Message({
        message: errMsg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(errMsg))
    } else {
      return res
    }
  },

  error => {
    console.log('MMHH', JSON.stringify(error))
    const { data } = error.response
    const errMsg = errMsgObj[data.status] || errMsgObj[data.code] || '网络请求出错'
    Message.closeAll()
    Message({
      message: errMsg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
