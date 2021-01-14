// 订单管理导航条
import request from '@/utils/request'
export function navigation(data) {
  return request({
    url: '/order-service/management/status/count/show',
    data: {
      userType: 2
    },
    method: 'POST'
  })
}