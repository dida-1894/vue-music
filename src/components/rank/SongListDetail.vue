<template lang="html">
  <div class="song-list-detail">
    <detail-header>
      <mu-icon
      value="keyboard_arrow_left"
      color="#fff"
      slot="leftIcon"
      size="45"
      @click="back"></mu-icon>
    </detail-header>
    <div class="layer" ref="layer" style="transform: translate3d(0, 0, 0)">
      <img :src="coverImgUrl" class="layerBgImg" alt="">
      <div class="filter" ref="filter"></div>
      <div ref="headMsg">
        <head-msg
          :coverImgUrl="coverImgUrl"
          :tracks="tracks"
          :headMsg="headMsg"></head-msg>
      </div>
    </div>
    <b-scroll
        :data = "[tracks]"
        :listenScroll = "listenScroll"
        @scroll = "scroll"
        class="wrapper"
        refs="wrappers">
        <div class="content">
          <song-list
            @playSong="playSong"
            :tracks="tracks"></song-list>
        </div>
      </b-scroll>
    <main-footer></main-footer>
  </div>
</template>

<script>
import DetailHeader from 'components/header/DetailHeader'
import MainFooter from 'components/header/MainFooter'
import BScroll from 'components/header/Scroll'
import HeadMsg from 'components/header/HeadMsg'
import SongList from 'components/header/SongList'
import {mapGetters, mapActions} from 'vuex'
import {selectPlay} from "../../store/actions"
export default {
  components:{
    DetailHeader,
    MainFooter,
    BScroll,
    HeadMsg,
    SongList
  },
  computed: {
    ...mapGetters([
      'songlist'
    ]),
    headMsg(){
      let name = this.songlist.playlist.name
      return {
        name,
        description: this.songlist.playlist.description,
        commenCount: this.songlist.playlist.commenCount,
        shareCount: this.songlist.playlist.shareCount,
        userId: this.songlist.playlist.userId,
        avatarUrl: this.songlist.playlist.creator.avatarUrl,
        nickname: this.songlist.playlist.creator.nickname,
        tags: this.songlist.playlist.creator.tags,
      }
    },
    tracks(){
      return {
        trackCount: this.songlist.playlist.trackCount,
        playlist: this.songlist.playlist.tracks,
        subscribedCount: this.songlist.playlist.subscribedCount,
      }
    },
    coverImgUrl() {
      return this.songlist.playlist.coverImgUrl
    }
  },
  data() {
    return {
      probeType: 0,
      scrollY: 0,
      listenScroll: false,
      headMsgHeight: 0
    }
  },
  watch: {
    scrollY: function (newY){
      let trnaslateY = Math.max(this.minTranslateY, newY)
      const percent = Math.abs(newY / this.headMsgHeight)
      let blur = Math.min(20 * percent, 20)
      // console.log(trnaslateY )
      this.$refs.layer.style = `transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);transition-duration: 0ms;transform: translate(0px, ${trnaslateY}px) scale(1) translateZ(0px);`
    }
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    scroll(pos){
      // let head = this.$ref.scrollTop
      this.scrollY = pos.y
    },
    ...mapActions([
      'selectPlay'
    ]),
    playSong(song, index){
      console.log(index)
      this.selectPlay({
        list: this.songlist.playlist.tracks,
        index
      })
    }
  },
  created() {
    setTimeout(() => {
      this.probeType = 3
      this.listenScroll = true
      this.headMsgHeight = this.$refs.headMsg.offsetHeight
      this.$refs.layer.style.height = this.headMsgHeight + 50 + "px"
      this.minTranslateY = -this.headMsgHeight + 41
      document.querySelector('.wrapper').style.marginTop = this.headMsgHeight + 50 + "px"
      console.log(this.minTranslateY)
      console.log(this.$refs.headMsg.offsetHeight)
    }, 10)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable.styl'
  .song-list-detail
    width: 100%
    height: 100%
    position: relative
    padding-top 1px
    .layer
      width 100%
      position absolute
      padding-top 51px
      overflow hidden
      z-index 6
      .filter
        width 100%
        height 100%
        position absolute
        top -41px
        z-index 7
      .layerBgImg
        position: absolute
        top -51px
        z-index -1
        max-width 100%
        height auto
        -webkit-filter: blur(20px)
    .wrapper
      width: 100%
      height calc(100% - 102px)
      position: relative
</style>
