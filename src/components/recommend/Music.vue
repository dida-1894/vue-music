<template>
  <div class="music">
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
  </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      defalut: []
    },
    SongList: {
      type: Array,
      default: []
    }
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
</style>
