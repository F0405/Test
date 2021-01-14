import request from '@/utils/request'

export function transactionList(query) {
  return request({
    url: '/test-url/transaction/list',
    method: 'get',
    params: query
  })
}
