import axios from 'axios'

const RecommendBanner = 'http://musicapi.ashyang.cn/banner'
const RecommendSongList = 'http://musicapi.ashyang.cn/personalized'
const SongListDetail = 'http://musicapi.ashyang.cn/playlist/detail'

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
  }
}
