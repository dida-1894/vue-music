import * as types from './mutation-types'
//定义对数据的修改，mutation本质是函数，对接受的回调函数
const mutations = {
  [types.SET_SONGLIST](state, songlist){
    state.songlist = songlist
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullscreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  }

}

export default mutations
