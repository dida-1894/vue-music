<template>
    <div class="PlayScreen" v-show="fullScreen" :style="{backgroundImage:'url(' + currentSong.al.picUrl + ')'}">
      <div class="layer"></div>
      <!--<img :src="currentSong.al.picUrl" alt="">-->
      <detail-header :HeadLine="currentSong.al.name">
        <mu-icon
          value="keyboard_arrow_left"
          color="#fff"
          slot="leftIcon"
          size="45"
          @click="back"></mu-icon>
      </detail-header>
      <div class="normal-player">
        <mu-container style="height: 100%" class="flex-wrapper">
          <mu-row fill style=" height: calc(100% - 129px); overflow: hidden">
            <mu-col
              span="6"
              align-self="center"
              offset="3"
              :style="{backgroundImage:'url(' + currentSong.al.picUrl + ')'}"
              class="center-img"></mu-col>
          </mu-row>
          <mu-row style="text-align: center;">
            <mu-col gutter span="3" v-for="(icon,index) in icons" :key="index">
              <mu-icon :value="icon.value"></mu-icon>
            </mu-col>
          </mu-row>
          <mu-row style="margin: 10px 0">
            <audio
              ref="audio"
              :src=" 'http://music.163.com/song/media/outer/url?id=' + currentSong.al.id + '.mp3'" ></audio>
          </mu-row>
          <mu-row style="text-align: center; margin-bottom: 10px">
            <mu-col
              v-for="(icon,index) in playIcons"
              align-self="center"
              :span="icon.width"
              :key="index">
              <mu-icon
                :size= "icon.size"
                :value="icon.value"></mu-icon>
            </mu-col>
          </mu-row>
        </mu-container>
      </div>
    </div>
</template>

<script>
  import DetailHeader from 'components/header/DetailHeader'
  import {mapGetters, mapMutations} from 'vuex'
    export default {
      name: "PlayScreen",
      components: {
        DetailHeader
      },
      computed: {
        ...mapGetters([
          'fullScreen',
          'playlist',
          'currentSong'
        ])
      },
      data(){
        return {
          msg: '歌曲名',
          icons: [
            {
              name: 'likes',
              value: 'favorite_border'
            },
            {
              name: 'download',
              value: 'save_alt'
            },
            {
              name: 'comments',
              value: 'chat'
            },
            {
              name: 'more',
              value: 'more_vert'
            }
          ],
          playIcons: [
            {
              name: 'mode',
              value: 'playlist_play',
              width: 1.5,
              size: 35
            },
            {
              name: 'previous',
              value: 'skip_previous',
              width: 3,
              size: 45
            },
            {
              name: 'play',
              value: 'play_circle_outline',
              width: 3,
              size: 45
            },
            {
              name: 'next',
              value: 'skip_next',
              width: 3,
              size: 45
            },
            {
              name: 'playlist',
              value: 'queue_music',
              width: 1.5,
              size: 35
            }
          ]
        }
      },
      methods: {
        back() {
          // console.log('back')
          this.setFullScreen(false)
          console.log(this.fullScreen)
        },
        ...mapMutations({
          setFullScreen: 'SET_FULL_SCREEN'
        })
      },
      created() {
        // console.log(this.playlist)
        this.$nextTick(() => {
          console.log(this.$refs.audio)
          this.$refs.audio.play()
        })
        console.log(this.currentSong.al)
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .PlayScreen
    width 100%
    height 100%
    color #eeeeee
    position absolute
    top 0px
    z-index 100
    overflow hidden
    background-size cover
    background-position center
    .layer
      width 100%
      height 100%
      background-color rgba(0, 0, 0, .8)
      position absolute
      top 0
      z-index 0
    .normal-player
      width 100%
      padding-top 50px
      height 100%
      .center-img
        padding-top 50%
        background-color #4caf50
        border 4px solid #eeeeee
        border-radius 50%
        background-position center
        background-size contain
</style>
