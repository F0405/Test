import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user-service/login/login-by-pwd',
    method: 'post',
    data
  })
}

// 验证码登录
export function loginBySmscode(data) {
  return request({
    url: '/user-service/login/login-by-smscode',
    method: 'post',
    data
  })
}

// 切换身份，登录别人的账户
export function loginByOther(data) {
  // 不需要加入token
  return new Promise((resolve, reject) => {
    resolve({
      'code': 200,
      'message': null,
      'body': [
        {
          'id': '1',
          'path': 'account',
          'subMenus': [
            {
              'id': '3',
              'path': 'creation',
              'subMenus': null
            },
            {
              'id': '4',
              'path': 'setting',
              'subMenus': null
            },
            {
              'id': '2',
              'path': 'ws',
              'subMenus': null
            }
          ]
        }
      ]
    })
  })

  // return request({
  //   url: '/user-service/login/get-ws-menus',
  //   method: 'get',
  //   data
  // })
}
// 发送验证码
export function sendVerifyCode(data) {
  return request({
    url: '/basic-service/basic-service/sms/send-sms-code' + '?phone=' + data.phone,
    method: 'get'
  })
}
// 发送验证码 验证手机号
export function sendVerifyCode2(data) {
  return request({
    url: '/user-service/sms/send-sms',
    method: 'get',
    params: data
  })
}

// 忘记后，重置密码
export function resetPwd(data) {
  return request({
    url: '/user-service/login/console/forget-pwd',
    method: 'post',
    data
  })
}

export function checkSMS(params) {
  return request({
    url: '/basic-service/basic-service/sms/check-sms-code',
    method: 'GET',
    params: params
  })
}

export function completWsInfo(data) {
  return request({
    url: '/business-entity-service/wholesaler/perfectInfo',
    method: 'POST',
    data: data
  })
}
export function putWsInfo(data) {
  return request({
    url: '/business-entity-service/wholesaler',
    method: 'PUT',
    data: data
  })
}

//
export function getInfo(token) {
  return {
    status: 200,
    data: {
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      introduction: 'I am a super administrator',
      name: 'Super Admin',
      roles: ['admin']
    }
  }
  // return request({
  //   url: '/login/get-ws-menus',
  //   method: 'get',
  //   params: { token }
  // })
}

export function logout() {
  return request({
    url: '/user-service/login/logout',
    method: 'get'
  })
}

// 获取ABI账号信息
export function getABIInfo() {
  return request({
    url: '/user-service/user/console/abi',
    method: 'GET'
  })
}
