import axios from 'axios'

const RecommendBanner = 'http://musicapi.ashyang.cn/banner'
const RecommendSongList = 'http://musicapi.ashyang.cn/personalized'
const SongListDetail = 'http://musicapi.ashyang.cn/playlist/detail'
const RecommendRadio = 'http://musicapi.ashyang.cn/personalized/djprogram'
const NewSong = 'http://musicapi.ashyang.cn/personalized/newsong'

export default {
  getRecommendBanner(){
    return axios.get(RecommendBanner)
  },
  getRecommendSongList(){
    return axios.get(RecommendSongList)
  },
  getSongListDetail(id){
    return axios.get(SongListDetail, {
      params:{
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
