import { Message } from 'element-ui'

function showError(msg) {
  Message.closeAll()
  Message({
    message: msg,
    type: 'error',
    duration: 5 * 1000
  })
}

export function validPhone(phone) {
  if (!phone || phone.length === 0) {
    return showError('')
  }
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  return str && str.length > 0
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export function validPwd(pwd) {
  // const validLen = pwd.length >= 6 && pwd.length <= 18
  // const pwdRegex = new RegExp(`^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?~!@#$%^&*(),./';:{}+<>|=`\"\[\]\\_-])[\da-zA-Z?~!@#$%^&*(),./';:{}+<>|=`\"\[\]\\_-]{6,18}$`)
  // const isLetterAndNum = pwdRegex.test(pwd)
  // const chineseRegex = new RegExp('[^\x00-\xff]')
  // const hasChinese = chineseRegex.test(pwd)
  // const hasSpecial = escape(pwd).indexOf('%') > -1
  // const hasSpace = pwd.indexOf(' ') > -1
  // return validLen && isLetterAndNum && !hasSpace && !hasChinese && hasSpecial
  return true
}
