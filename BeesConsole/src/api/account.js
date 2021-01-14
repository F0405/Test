// 账户管理
import request from '@/utils/request'
// 账号修改手机号
export function modifyPhone(data) {
  return request({
    url: '/user-service/user/console/change-phone',
    data: data,
    method: 'PUT'
  })
}
// 账号修改密码
export function modifyPwd(data) {
  return request({
    url: '/user-service/user/console/inner-change-pwd',
    data: data,
    method: 'PUT'
  })
}
// WS分页列表
export function managementlist(data) {
  return request({
    url: '/wholesaler/pageList',
    data: data,
    method: 'POST'
  })
}
// WS管理-新增t
export function createWs(data) {
  return request({
    url: '/user-service/user/console/ws',
    data: data,
    method: 'POST'
  })
}
// WS管理-编辑
export function editWs(data) {
  return request({
    url: '/user-service/user/console/ws/abi-change-ws-info',
    data: data,
    method: 'PUT'
  })
}

// 首次登录完善信息
export function managementinformation(data) {
  console.log(data, 'data')
  return request({
    url: '/wholesaler/perfectInfo',
    data: data,
    method: 'POST'
  })
}

// 获取经销商详情
export function getWsInfo(params) {
  return request({
    url: `/business-entity-service/wholesaler/${params.id}`,
    method: 'GET'
    // params: params
  })
}
// 经销商员工信息
export function managementemployees(id) {
  return request({
    // eslint-disable-next-line no-undef
    url: '/console/abi',
    method: 'GET'
  })
}
