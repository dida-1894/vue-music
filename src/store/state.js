import {playModeConf} from "../common/js/config"

const state = {
  songlist: {},
  playing: false, //是否播放，播放就是true
  fullScreen: false, //全屏播放
  playlist: [], //播放列表， 顺序列表
  sequenceList: [], //随机播放
  mode: playModeConf.sequence,//播放模式,默认顺序播放
  currentIndex: -1//播放索引,上一首歌，下一首歌切换。
}

export default state
