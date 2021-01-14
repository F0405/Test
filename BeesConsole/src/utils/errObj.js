const errMsgObj = {
  400: '参数异常',
  401: '没有权限',
  403: '禁止访问',
  404: '你请求的路径不存在',
  405: '操作失败',
  500: '服务异常',
  5000: '系统异常!',
  5001: '请求参数校验异常',
  5002: '请求参数解析异常',
  5003: 'HTTP Media 类型异常',
  5005: '系统登录异常',
  30001: '系统业务异常',
  40001: '系统内部错误',
  10001: '参数为空',
  10002: '参数不全',
  1003: '参数类型错误',
  10004: '参数无效',
  20001: '用户不存在',
  20002: '用户未登陆',
  20003: '用户名或密码错误',
  20004: '用户账户已被禁用',
  20005: '用户已存在',
  20006: '积分不足',
  20007: '禁止操作！',
  50001: '数据未找到',
  50002: '数据有误',
  50003: '数据已存在',
  50004: '数据过期',
  50006: '无法识别！',
  50007: '交易失败！',
  60001: '系统内部接口调用异常',
  60002: '系统外部接口调用异常',
  60003: '接口禁止访问',
  60004: '接口地址无效',
  60005: '接口请求超时',
  60006: '接口负载过高',
  70001: '订单不存在',
  70002: '子单不存在',
  70003: '创建订单错误',
  70004: '统一下单异常',
  70006: '订单积分与退款积分有误',
  70007: '订单金额与退款金额有误',
  70008: '订单状态有误，请刷新确认',
  70009: '订单处于退款状态中，请确认',
  70010: '退款单不存在，请确认',
  70011: '订单已退款，请确认',
  70012: '订单申请退款失败 ',
  70013: '退款单价与实付单价不符',
  70014: '订单中部分商品的价格已发生变化，请重新提交订单',
  70015: '订单中有部分商品发生了变化，无法去支付',
  70016: '选购商品的库存量发生了变化，请重新提交结算',
  80000: '商品不存在或已下架',
  80001: '商品库存不足',
  80002: '商品失效'
}

export default errMsgObj