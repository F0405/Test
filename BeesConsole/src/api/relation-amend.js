import request from '@/utils/request'

// 售点状态列表
export function getStatusList(data) {
  return request({
    url: '/business-entity-service/poc/common/option/approval-status',
    method: 'GET'
  })
}

// 售点列表数据
export function getPocList(data) {
  // console.log(99977, data)
  return request({
    url: '/business-entity-service/poc/relationship/paging',
    params: data,
    method: 'GET'
  })
}

// 获取M1负责人列表
export function getM1List(data) {
  return request({
    url: '/user-service/user/get-m1-list',
    params: data,
    method: 'GET'
  })
}

// 售点关系批量变更
export function M1change(data) {
  // console.log(data, 999)
  return request({
    url: '/business-entity-service/poc/relationship/batch',
    data: data,
    method: 'PUT'
  })
}
