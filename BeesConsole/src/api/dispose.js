import request from '@/utils/request'

// 资源位首页列表
export function getPageList(data) {
  return request({
    url: '/business-entity-service/banner/pageList',
    data: data,
    method: 'POST'
  })
}

// 删除
export function deleteBanner(id) {
  return request({
    url: `/business-entity-service/banner/${id}`,
    method: 'DELETE'
  })
}
