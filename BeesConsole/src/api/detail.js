import request from '@/utils/request'

// 商品档案列表
export function getDetail(id) {
  return request({
    url: `/business-entity-service/banner/${id}`,
    method: 'GET'
  })
}
