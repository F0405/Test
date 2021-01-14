import request from '@/utils/request'

// 常购清单列表
export function getCommonList(data) {
  return request({
    url: '/business-entity-service/freqPurchaseList/pageList',
    data: data,
    method: 'POST'
  })
}

// 删除清单
export function deleteCommon(id) {
  return request({
    url: `/business-entity-service/freqPurchaseList/${id}`,
    method: 'DELETE'
  })
}

// 添加清单
export function postCommonList(data) {
  return request({
    url: `/business-entity-service/freqPurchaseList`,
    data: data,
    method: 'POST'
  })
}

// 编辑清单单个数据
export function getTyroCommon(id) {
  return request({
    url: `/business-entity-service/freqPurchaseList/${id}`,
    methods: 'GET'
  })
}
// 编辑清单
export function detailCommonList(data) {
  return request({
    url: `/business-entity-service/freqPurchaseList`,
    data: data,
    method: 'PUT'
  })
}

