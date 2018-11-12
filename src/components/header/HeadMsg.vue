<template>
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
        <span style="color:#aaa">（共{{tracksHead.trackCount}}首）</span>
      </mu-col>
      <mu-col span="4" style="background-color:#d32f2f;color:#fff;text-align:center;vertical-align:middle;border-top-right-radius:10px;padding:9.5px 0px">
        收藏（{{tracksHead.subscribedCount}}）
      </mu-col>
    </mu-row>
  </mu-container>
</template>

<script>
    export default {
      name: "HeadMsg",
      data(){
        return {
          icons: [
            {
              icon: "chat",
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
      props: {
        coverImgUrl: {
          type: String,
          default: ''
        },
        headMsg: {
          type: Object,
          default: {}
        },
        tracksHead: {
          type: Object,
          default: {}
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
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
</style>
