import axios from 'axios'

const RecommendBanner = 'http://musicapi.ashyang.cn/banner'
const RecommendSongList = 'http://musicapi.ashyang.cn/personalized'
const SongListDetail = 'http://musicapi.ashyang.cn/playlist/detail'
const RecommendRadio = 'http://musicapi.ashyang.cn/personalized/djprogram'
const NewSong = 'http://musicapi.ashyang.cn/personalized/newsong'
const MusicPlayUrl = 'http://musicapi.ashyang.cn/song/url'
const SongLyric = 'http://musicapi.ashyang.cn/lyric'
const HighlyqualitySonglist = 'http://musicapi.ashyang.cn/top/playlist/highquality'
const SearchHot = 'http://musicapi.ashyang.cn/search/hot'
const Search = 'http://musicapi.ashyang.cn/search'

export default {
  getSearch(keywords) {
    return axios.get(Search, {
      params: {
        keywords
      }
    })
  },
  getSearchHot() {
    return axios.get(SearchHot)
  },
  getHighlyqualitySonglist(before, limit, tag) {
    return axios.get(HighlyqualitySonglist, {
      params: {
        before: before,
        tag: tag,
        limit: limit
      }
    })
  },
  getSongLyric(id) {
    return axios.get(SongLyric, {
      params: {
        id: id
      }
    })
  },
  getRecommendBanner() {
    return axios.get(RecommendBanner)
  },
  getRecommendSongList() {
    return axios.get(RecommendSongList)
  },
  getSongListDetail(id) {
    return axios.get(SongListDetail, {
      params:{
        id: id
      }
    })
  },
  getMusicPlayUrl(id) {
    return axios.get(MusicPlayUrl, {
      params: {
        id:id
      }
    })
  },
  getRecommendRadio(){
    return axios.get(RecommendRadio)
  },
  getNewSong(){
    return axios.get(NewSong)
  }
}
