import * as types from './mutation-types'

const mutations = {
  [types.SET_SONGLIST](state, songlist){
    state.songlist = songlist
  }
}

export default mutations
