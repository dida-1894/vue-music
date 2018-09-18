<template lang="html">
  <div id="recommend">
    <main-header :iconName="HIconLeft">
      <search slot="headerMiddle"></search>
    </main-header>
    <div class="line"></div>
    <keep-alive>
      <tab :TabItems="TabItems"></tab>
    </keep-alive>
    <div class="line"></div>
    <div class="re-slider">
      <div class="bg-color"></div>
      <mu-carousel hide-controls class="banner">
        <mu-carousel-item v-for = "(ban,index) in banners" :key="index">
          <img :src="ban.picUrl"  />
        </mu-carousel-item>
      </mu-carousel>
      <icon-item></icon-item>
      <div class="re-content">
        <h2 class="re-title">
          <span>推荐歌单</span>
          <mu-icon value="keyboard_arrow_right" style="vertical-align:middle"></mu-icon>
        </h2>
        <mu-row gutter>
          <mu-col span="4" v-for="(item, index) in SongList" :key="index">
            <router-link tag="div"
            :to="{ name: 'SongListDetail', params: {id:item.id} }">
              <img :src="item.picUrl" alt="">
              <div class="re-name">
                {{item.name}}
              </div>
            </router-link>
          </mu-col>
        </mu-row>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainHeader from 'components/header/MainHeader'
import Search from 'components/header/Search'
import MainFooter from 'components/header/MainFooter'
import Tab from "components/header/Tab"
import IconItem from "./IconItem"
import api from "../../api/index"
export default {
  components: {
    MainHeader,
    Search,
    Tab,
    IconItem,
    MainFooter
  },
  data() {
    return {
      HIconLeft: "mic_none",
      HIconRight: "",
      TabItems: [
        {
          name: "个性推荐",
          r_link : "/"
        },
        {
          name: "主播电台",
          r_link: "/radio"
        }
      ],
      banners: [],
      SongList: []
    }
  },
  mounted:function(){
    this.getData()
  },
  watch: {

  },
  methods: {
    getData: function(){
      api.getRecommendBanner()
      .then((res) => {
        let dataResult = res.data.banners
        this.banners = dataResult
      })
      .catch((err) => console.log(err)),
      api.getRecommendSongList()
      .then((res) => {
        let dataResult = res.data.result.slice(0, 6)
        this.SongList = dataResult
      })
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable.styl"
  #recommend
    height: 100%
    position: relative
    .re-slider
      height: calc(100% - 156px)
      position: relative
      overflow-y: scroll
      overflow-x: hidden
      .re-content
        padding: 10px 2% 0 2%
        margin-top: 20px
        border-top: 1px solid $color-border
        img
          max-width: 100%
        .re-name
          font-size: 12px
          margin-bottom: 10px
          overflow:hidden
          text-overflow:ellipsis
          display:-webkit-box
          -webkit-box-orient:vertical
          -webkit-line-clamp:2
        .re-title
          height: 30px
          line-height: 30px
          span
            vertical-align: middle
      .banner
        width: 96%
        height: 140px
        margin: 2%
        border-radius: 5px
        img
          max-width: 100%
      .bg-color
        background-color: $color-background
        width: 100%
        height: 120px
        position: absolute
        top: -1px
        z-index: -1
    .line
      height: 1px;
      background-color: $color-background
      margin-top: -2px
</style>
