<template lang="html">
  <div id="recommend">
    <main-header :iconName="HIconLeft">
      <search slot="headerMiddle"></search>
    </main-header>
    <div class="line"></div>
    <mu-tabs
      center
      color="#d32f2f"
      indicator-color="#fff">
      <mu-tab @click.native="goRecommend">个性推荐</mu-tab>
      <mu-tab @click.native="goRadio">主播电台</mu-tab>
    </mu-tabs>
    <div class="line"></div>
    <keep-alive>
      <router-view name="recommend"></router-view>
    </keep-alive>
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
      banners: [],
      SongList: []
    }
  },
  mounted:function(){
    this.getData()
  },
  watch: {
    // '$route' (to, from) {
    //   this.$router.go(0)
    // }
  },
  methods: {
    goRecommend: function(){
      this.$router.push({
        name: "ReMusic"
      })
    },
    goRadio: function() {
      this.$router.push({
        name: 'Radio'
      })
    },
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
    .line
      height: 1px;
      background-color: $color-background
      margin-top: -2px
</style>
