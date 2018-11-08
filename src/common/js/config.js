export const playMode = { //播放模式的配置
  sequence: 0, //顺序播放
  loop: 1, //循环播放
  random: 2 //随机播放
}

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
})
