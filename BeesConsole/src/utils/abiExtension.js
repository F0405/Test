/* eslint-disable no-cond-assign */
export function removeLetter(str) {
  var result
  var reg = /[a-zA-Z|_ ]+/
  while (result = str.match(reg)) {
    str = str.replace(result[0], '')
  }
  return str
}
