import request from '@/utils/request'
// 商品品牌列表
export function getFileList(data) {
  return request({
    url: '/products-service/products/manager/queryProductsBrandPage',
    params: data,
    method: 'GET'
  })
}
// 商品品牌删除
export function brandRemove(data) {
  console.log('api', data)
  return request({
    url: '/products-service/products/manager/deleteProductsBrand',
    data: data,
    method: 'PUT'
  })
}
// 商品品牌创建
export function createBrand(data) {
  return request({
    url: '/products-service/products/manager/createProductsBrand',
    data: data,
    method: 'POST'
  })
}
// 商品品牌编辑
export function editorBrand(data) {
  return request({
    url: '/products-service/products/manager/editProductsBrand',
    data: data,
    method: 'PUT'
  })
}
// 商品单位列表
export function unitList(data) {
  return request({
    url: '/products-service/products/manager/queryProductsUnitPage',
    params: data,
    method: 'GET'
  })
}
// 删除商品单位
export function removeunit(data) {
  return request({
    url: '/products-service/products/manager/delProductsUnit',
    data: data,
    method: 'PUT'
  })
}
// 商品单位创建
export function addunit(data) {
  return request({
    url: '/products-service/products/manager/createProductsUnit',
    data: data,
    method: 'POST'
  })
}
// 商品查询单位
export function selectunit(data) {
  return request({
    url: '/products-service/products/manager/queryProductsUnitPage',
    params: data,
    method: 'GET'
  })
}
// 商品单位编辑
export function editorunit(data) {
  return request({
    url: '/products-service/products/manager/editProductsUnit',
    data: data,
    method: 'PUT'
  })
}
// 创建商品分类
export function classification(data) {
  return request({
    url: '/products-service/products/manager/createProductsCategory',
    data: data,
    method: 'POST'
  })
}
// 查询商品分类
export function selectclassification(data) {
  return request({
    url: '/products-service/products/manager/queryProductsCategory',
    params: data,
    method: 'GET'
  })
}
// 删除商品分类
export function deleteclassification(data) {
  return request({
    url: '/products-service/products/manager/delProductsCategory',
    data: data,
    method: 'PUT'
  })
}
// 编辑商品分类
export function editorclassification(data) {
  return request({
    url: '/products-service/products/manager/editProductsCategory',
    data: data,
    method: 'PUT'
  })
}
