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
    <div class="bg">
    </div>
    <img :src="coverImgUrl" class="bg-img" />
    <b-scroll
    :data = "[tracks,headMsg]"
    :listenScroll = "true"
    @scroll = "scroll"
    class="wrapper">
      <div class="content">
        <mu-container class="head-msg">
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
          <mu-row gutter style="color:#fff;text-align:center;margin-top:20px">
            <mu-col v-for="(item,index) in icons" :key="index" span="3">
              <mu-icon
              color="#fff"
              size = "30"
              :value="item.icon"></mu-icon>
              <div>{{item.name}}</div>
            </mu-col>
          </mu-row>
        </mu-container>
        <div class="tracks">
          <mu-row class="track-head" :class="{track_head_hold:holdTitle}">
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
          <mu-row class="playlist" v-for="(play,index) in tracks.playlist" :key="index">
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
import api from '../../api/index'
export default {
  components:{
    DetailHeader,
    MainFooter,
    BScroll
  },
  data() {
    return {
        id: this.$route.params.id,
        // id: 2187262716,
        headMsg:{},
        tracks: {},
        holdTitle: false,
        coverImgUrl: "",
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
        ]
    }
  },
  mounted: function(){
      // console.log(this.id)
      this.getData()
  },
  methods: {
    back(){
      console.log("back")
    },
    scroll(pos){
      if (pos.y < -238) {
        console.log("ooo")
          this.holdTitle = true
      }
    },
    getData(){
      api.getSongListDetail(this.id)
      .then((res) => {
        let dataResult = res.data.playlist
        this.coverImgUrl = dataResult.coverImgUrl
        this.headMsg.name = dataResult.name
        this.headMsg.description = dataResult.description
        this.headMsg.commenCount = dataResult.commenCount
        this.headMsg.shareCount = dataResult.shareCount
        this.headMsg.userId = dataResult.userId
        this.headMsg.avatarUrl = dataResult.creator.avatarUrl
        this.headMsg.nickname = dataResult.creator.nickname
        this.headMsg.tags = dataResult.creator.tags
        this.tracks.trackCount = dataResult.trackCount
        this.tracks.playlist = dataResult.tracks
        this.tracks.subscribedCount = dataResult.subscribedCount
        console.log(dataResult.tracks)
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable.styl'
  .song-list-detail
    width: 100%
    height: 100%
    position: relative
    .bg
      width: 100%
      height: 0px
      padding-top: 100%
      position: absolute
      z-index: -2
      top: 0px
      left: 0px
      background-color: $color-background-dd
      -webkit-filter: blur(20px)
    img.bg-img
      position: absolute
      top: 0px
      z-index: -4
      max-width: 100%
      max-height: 100%
      -webkit-filter: blur(20px)
    .wrapper
      height: calc(100% - 102px)
      width: 100%
      overflow: hidden
      .content
        .head-msg
          margin-top: 10px
          .row.funct-icon
            text-align: center
            color: $color-text
          .cover-img
            img
              max-width: 100%
              max-height: 100%
              border-radius: 5px
          .name
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
        .tracks
          div.track_head_hold
            position: sticky
            top: 46px
          .track-head
            margin-top: 10px
            border-top-left-radius: 10px
            border-top-right-radius: 10px
            background-color: $color-background-height
            height: 40px
          .playlist
            padding: 8px 0px
            background-color: $color-background-height
            border: 1px solid $color-border
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
