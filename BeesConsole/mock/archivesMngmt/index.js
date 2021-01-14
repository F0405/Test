const Mock = require('mockjs')

const listDate = Mock.mock({
  'list|50': [{
    'id|+1': 1,
    'skuCode': '@cword(4,6)',
    'sapSkuCode': '@cword(4,6)',
    'erpSkuCode': '6971269981604',
    'name': '@cword(4,6)',
    'spec': '@cword(4,6)',
    'goodsBrandName': '百威',
    'subGoodsBrandName': '@cword(4,6)',
    'ptr': '22',
    'goodsUnitName': '箱',
    'statusName': '@boolean'
  }]
})
const goodsList = Mock.mock({
  'list|50': [{
    'id|+1': 1,
    'skuCode': '1000001',
    'sapSkuCode': '11234',
    'mainImageUrl': "@dataImage('50x50', 'Hello')",
    'name': '@cword(4,6)',
    'goodsBrandName': '@cword(2)',
    'createdTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
    'ptr': '￥999',
    'goodsUnitName': '箱',
    'statusName': '@boolean'
  }]
})
const property = Mock.mock({
  'list|40': [{
    'id+1': 1,
    'sku': '1000001',
    'name': '百威',
    'cname': '@cname'
  }]
})
Mock.mock('/get/propertyList', 'get', property)
Mock.mock('/get/list', 'get', listDate)
Mock.mock('/get/goodslist', 'get', goodsList)

