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
    <!--<div class="bg">-->
    <!--</div>-->
    <!--<img :src="coverImgUrl" class="bg-img" />-->
    <div class="layer" ref="layer" style="transform: translate3d(0, 0, 0)">
      <img :src="coverImgUrl" class="layerBgImg" alt="">
      <div class="filter" ref="filter"></div>
      <mu-container ref="headMsg" class="head-msg">
        <mu-row gutter>
          <mu-col span="5" class="cover-img">
            <img :src="coverImgUrl" />
          </mu-col>
          <mu-col span="7">
            <div class="name">{{headMsg.name}}</div>
            <div class="creator">
              <img :src="headMsg.avatarUrl" alt="" />
              <span>{{headMsg.nickname}}</span>
              <mu-icon
                value="keyboard_arrow_right"
                size = "18"
                class="icon"
                color = "#fff"></mu-icon>
            </div>
          </mu-col>
        </mu-row>
        <mu-row gutter style="color:#fff;text-align:center;margin:10px 0px">
          <mu-col v-for="(item,index) in icons" :key="index" span="3">
            <mu-icon
              color="#fff"
              size = "30"
              :value="item.icon"></mu-icon>
            <div>{{item.name}}</div>
          </mu-col>
        </mu-row>
        <mu-row gutter class="track-head">
          <mu-col span="1" style="vertical-align:middle;padding:9px 0px">
            <mu-icon value="play_circle_filled_white"></mu-icon>
          </mu-col>
          <mu-col span="7" style="vertical-align:middle;padding:10px 0px">
            播放全部
            <span style="color:#aaa">（共{{tracks.trackCount}}首）</span>
          </mu-col>
          <mu-col span="4" style="background-color:#d32f2f;color:#fff;text-align:center;vertical-align:middle;border-top-right-radius:10px;padding:9.5px 0px">
            收藏（{{tracks.subscribedCount}}）
          </mu-col>
        </mu-row>
      </mu-container>
    </div>
    <b-scroll
        :data = "[tracks]"
        :listenScroll = "listenScroll"
        @scroll = "scroll"
        class="wrapper"
        refs="wrappers">
        <div class="content">
          <div class="tracks">
            <mu-row class="playlist" align-items="center" v-for="(play,index) in tracks.playlist" :key="index">
              <mu-col class="list-icon" span="1">{{index + 1}}</mu-col>
              <mu-col span="9">
                <div class="music-name">
                  {{play.al.name}}
                  <div class="ar" style="font-size:12px;color:#aaa">
                  <span v-for='(ar, i) in play.ar' :key="i">
                    {{ar.name}}
                  </span>
                  </div>
                </div>
              </mu-col>
              <mu-col span="1">
                <mu-icon v-show="play.cd" class="list-icon" value="music_video"></mu-icon>
              </mu-col>
              <mu-col class="list-icon" span="1">
                <mu-icon value="more_horiz"></mu-icon>
              </mu-col>
            </mu-row>
          </div>
        </div>
      </b-scroll>
    <main-footer></main-footer>
  </div>
</template>

<script>
import DetailHeader from 'components/header/DetailHeader'
import MainFooter from 'components/header/MainFooter'
import BScroll from 'components/header/Scroll'
import {mapGetters} from 'vuex'
export default {
  components:{
    DetailHeader,
    MainFooter,
    BScroll
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
      icons: [
          {
            icon: "chat",
            // name: this.headMsg.commenCount
            name: "171"
          },
          {
            icon: "launch",
            name: "171"
          },
          {
            icon: "save_alt",
            name: "下载"
          },
          {
            icon: "check_box",
            name: "多选"
          }
        ],
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
      console.log(trnaslateY)
      this.$refs.layer.style = `transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);transition-duration: 0ms;transform: translate(0px, ${trnaslateY}px) scale(1) translateZ(0px);`
      // this.$refs.layer.style = `webkit-transform：translate3d(0, ${newY}, 0)`
      // console.log(this.$refs.layer.style.transform)
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
  },
  created() {
    setTimeout(() => {
      this.probeType = 3
      this.listenScroll = true
      this.headMsgHeight = this.$refs.headMsg.offsetHeight
      this.$refs.layer.style.height = this.headMsgHeight + 51 + "px"
      this.minTranslateY = -this.headMsgHeight + 41
      document.querySelector('.wrapper').style.marginTop = this.headMsgHeight + 51 + "px"
      console.log(this.minTranslateY)
      console.log(this.headMsgHeight)
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
      .head-msg
        .track-head
          border-top-left-radius: 10px
          border-top-right-radius: 10px
          background-color: $color-background-height
          height: 40px
        .row.funct-icon
          text-align: center
          color: $color-text
        .cover-img
          img
            max-width: 100%
            max-height: 100%
            border-radius: 5px
        .name
          margin-top: 20px
          color: $color-text
          font-weight: $font-weight-title
          font-size: $font-size-small-medium-x
        .creator
          margin-top: 20px
          img
            width: 30px
            height: 30px
            border-radius: 50%
            vertical-align: middle
          span
            color: $color-text
          .icon
            vertical-align: middle
    .wrapper
      width: 100%
      height calc(100% - 102px)
      position: relative
      .content
        .tracks
          .playlist
            padding: 8px 0px
            background-color: $color-background-height
            border-bottom: 1px solid $color-border
            .list-icon
              color: #aaa
              text-align: center
              display: inline-block
              vertical-align: middle
            .music-name
              font-size: 16px
              display: inline-block
              text-overflow: ellipsis
              overflow: hidden
              white-space: normal
              vertical-align: middle
</style>
