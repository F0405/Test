import request from '@/utils/request'

// 商品档案列表
export function getarChivesList(data) {
  return request({
    url: '/products-service/products/manager/queryProductsBasePage',
    data: data,
    method: 'POST'
  })
}
// 商品品牌列表
export function getBrandList(data) {
  return request({
    url: '/products-service/products/manager/queryProductsBrand',
    params: data,
    method: 'GET'
  })
}
// 商品分类列表
export function getClassify() {
  return request({
    url: '/products-service/products/manager/queryProductsCategory',
    // params: data,
    method: 'GET'
  })
}
// 删除商品档案
export function deleteBrand(id) {
  return request({
    url: `/products-service/products/manager/delProductsBase`,
    data: id,
    method: 'PUT'
  })
}
// 商品发布列表
export function getGoodsList(data) {
  return request({
    url: '/products-service/products/manager/queryProductsPage',
    data: data,
    method: 'POST'
  })
}

// 商品单位列表
export function getBrandUnit() {
  return request({
    url: '/products-service/products/manager/queryProductsUnit',
    method: 'GET'
  })
}

// 商品保存草稿
export function draft(data) {
  return request({
    url: `/products-service/products/manager/draftProduct`,
    data: data,
    method: 'POST'
  })
}

// 商品发布新增
export function GoodsReleased(data) {
  return request({
    url: `/products-service/products/manager/releaseProduct`,
    data: data,
    method: 'POST'
  })
}

// 商品发布编辑
export function GoodsEditor(data) {
  return request({
    url: `/products-service/products/manager/editProduct`,
    data: data,
    method: 'PUT'
  })
}
// 商品档案新增
export function newGooodsRecord(data) {
  return request({
    url: `/products/manager/createProductsBase`,
    data: data,
    method: 'POST'
  })
}

// 商品档案编辑
export function GooodsRecordEditor(data) {
  return request({
    url: `/products/manager/editProductsBase`,
    data: data,
    method: 'PUT'
  })
}

// 商品发布上架
export function GooodsPutaway(id) {
  return request({
    url: `/products-service/products/manager/upProduct`,
    data: id,
    method: 'PUT'
  })
}

// 商品发布下架
export function GooodsSold(id) {
  return request({
    url: `/products-service/products/manager/downProduct`,
    data: id,
    method: 'PUT'
  })
}

// 中国地理省市区
export function getProvinces() {
  return request({
    url: `/ignite/ignite-service/third/basic-area`,
    method: 'GET'
  })
}

// 渠道子渠道
export function getChannel() {
  return request({
    url: `/ignite/ignite-service/third/basic_channel`,
    method: 'GET'
  })
}

