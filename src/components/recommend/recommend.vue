<template lang="html">
  <div id="recommend">
    <main-header :iconName="HIconLeft">
      <search slot="headerMiddle"></search>
    </main-header>
    <div class="bg"></div>
    <mu-tabs
      center
      color="#d32f2f"
      indicator-color="#fff">
      <mu-tab @click.native="goRecommend">个性推荐</mu-tab>
      <mu-tab @click.native="goRadio">主播电台</mu-tab>
    </mu-tabs>
    <b-scroll class="wrapper">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </b-scroll>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainHeader from 'components/header/MainHeader'
import Search from 'components/header/Search'
import BScroll from 'components/header/Scroll'
import MainFooter from 'components/header/MainFooter'
import Tab from "components/header/Tab"
export default {
  components: {
    MainHeader,
    Search,
    Tab,
    BScroll,
    MainFooter
  },
  data() {
    return {
      HIconLeft: "mic_none",
      HIconRight: "",
    }
  },
  mounted:function(){
  },
  watch: {
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
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable.styl"
  #recommend
    height: 100%
    position: relative
    .header
      // position: absolute
      z-index: 100
    .wrapper
      height: calc(100% - 156px)
    .bg
      width: 100%
      height: 50%
      z-index: -2
      position: absolute
      top: 0px
      background-color: $color-background
      margin-top: -2px
</style>
