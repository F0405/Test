const { exec } = require('child_process')
const fs = require('fs')

Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  return fmt
}

exec('git name-rev --name-only HEAD', (err, branchName, stderr) => {
  if (err) {
    console.log(err)
    return
  }
  const dateTimeStr = (new Date()).Format('yyyyMMddhhmmss')
  const version = `${branchName.replace(/(^\s*)|(\s*$)/g, '')}-${dateTimeStr}`.replace('/', '-')
  console.log(version)
  fs.writeFile('version.txt', version, function (error) {
    if (error) {
      console.log('写入失败')
    } else {
      console.log('写入成功了')
    }
  })
})

