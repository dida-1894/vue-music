import axios from 'axios'

const RecommendBanner = 'http://musicapi.ashyang.cn/banner'
const RecommendSongList = 'http://musicapi.ashyang.cn/personalized'

export default {
  getRecommendBanner(){
    return axios.get(RecommendBanner)
  },
  getRecommendSongList(){
    return axios.get(RecommendSongList)
  }
}
