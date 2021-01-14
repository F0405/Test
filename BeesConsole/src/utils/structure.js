export function ChannelRepeat(v, channelMap) {
  const ps = v ? v.split(',') : []
  let ret = ''
  ps.forEach(element => {
    ret += channelMap[element] + ' '
  })
  let odd = ''
  const arr = ret.split(' ')
  for (let i = 0; i < arr.length; i++) {
    if (odd.indexOf(arr[i]) === -1) {
      odd += arr[i] + ' '
    }
  }
  // console.log(odd)
  return odd
}
export function RegionRepeat (v, regionMap) {
  const ps = v ? v.split(',') : []
  let ret = ''
  ps.forEach(element => {
    ret += regionMap[element] + ' '
  })
  let odd = ''
  const arr = ret.split(' ')
  for (let i = 0; i < arr.length; i++) {
    if (odd.indexOf(arr[i]) === -1) {
      odd += arr[i] + ' '
    }
  }
  return odd
}

