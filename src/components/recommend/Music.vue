<template>
  <div class="music">
    <div class="re-slider">
      <div class="bg-color"></div>
      <mu-carousel hide-controls class="banner">
        <mu-carousel-item v-for = "(ban,index) in banners" :key="index">
          <img v-lazy="ban.imageUrl"  />
        </mu-carousel-item>
      </mu-carousel>
      <div style="background-color:#fff">
        <icon-item @selectRecommend="selectRecommend"></icon-item>
        <div class="re-content">
          <card @goToSonglistDetail="goToSonglistDetail" :content="SongList"></card>
          <card :content="NewSong"></card>
          <card :content='RadioList'></card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconItem from "./IconItem"
import api from "../../api/index"
import Card from "./Card"
import {mapMutations} from 'vuex'
export default {
  components: {
    IconItem,
    Card
  },
  data() {
    return {
      banners: [],
      SongList: {
        title: "推荐歌单",
        list: []
      },
      RadioList: {
        title: '推荐电台',
        list: []
      },
      NewSong: {
        title: '最新音乐',
        list: []
      }
    }
  },
  methods: {
    ...mapMutations({
      setSonglist: 'SET_SONGLIST'
    }),
    goToSonglistDetail:function(id){
      console.log(id)
      api.getSongListDetail(id)
        .then((res) => {
          this.$router.push({
            path:`/palylist/detail/${id}`
          })
          this.setSonglist(res.data)
        })
    },
    selectRecommend(name) {
      this.$router.push({
        path: 'recommend/songlist'
      })
    },
    getData: function(){
      api.getRecommendBanner()
      .then((res) => {
        let dataResult = res.data.banners
        this.banners = dataResult
      })
      .catch((err) => console.log(err))
      api.getRecommendSongList()
      .then((res) => {
        let dataResult = res.data.result.slice(0, 6)
        this.SongList.list = dataResult
      })
      api.getRecommendRadio()
      .then((res) => {
        let dataResult = res.data.result.slice(0, 6)
        this.RadioList.list = dataResult
      })
      api.getNewSong()
      .then((res) => {
        let dataResult = res.data.result.slice(0, 6)
        this.NewSong.list = dataResult
      })
    }
  },
  mounted: function(){
    this.getData()
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable.styl"
.re-slider
  height: calc(100% - 156px)
  position: relative
  overflow-y: scroll
  overflow-x: hidden
  .re-content
    padding: 10px 2% 0 2%
    margin-top: 20px
    border-top: 1px solid $color-border
  .banner
    width: 96%
    height: 140px
    margin: 2%
    border-radius: 5px
    img
      max-width: 100%
  .bg-color
    background-color: #fff
    width: 100%
    height: 110px
    position: absolute
    top: 100px
    z-index: -1
</style>
