import request from '@/utils/request'

// 售点列表数据
export function getAudite(data) {
  return request({
    url: '/business-entity-service/poc/register/review/paging',
    params: data,
    method: 'GET'
  })
}
// 售点通过
export function salePass(data) {
  return request({
    url: '/business-entity-service/poc/register/review/agree/batch',
    data: data,
    method: 'PUT'
  })
}
// 售点拒绝
export function saleQuite(data) {
  return request({
    url: '/business-entity-service/poc/register/review/refuse/batch',
    data: data,
    method: 'PUT'
  })
}
