<template>
    <div class="PlayScreen"  v-show="fullScreen" :style="{backgroundImage:'url(' + musicCover + ')'}">
      <div class="layer"></div>
      <detail-header :HeadLine="currentSong.name">
        <mu-icon
          value="keyboard_arrow_left"
          color="#fff"
          slot="leftIcon"
          size="45"
          @click="back"></mu-icon>
      </detail-header>
      <div class="normal-player">
        <mu-container style="height: 100%" class="flex-wrapper">
          <mu-row style=" height: calc(100% - 129px); overflow: hidden; " @click="showLyric">
            <mu-col
              v-show="!isLyric"
              span="6"
              align-self="center"
              offset="3"
              :style="{backgroundImage:'url(' + musicCover + ')'}"
              :class="playCd">
            </mu-col>
            <mu-col v-show="isLyric">
              <ul class="lyric-box">
                <li v-for="(lyric,index) in lyrics">
                  <p ref="lyricLine">{{lyric}}</p>
                </li>
              </ul>
            </mu-col>
          </mu-row>
          <mu-row style="text-align: center;">
            <mu-col gutter span="3" v-for="(icon,index) in icons" :key="index">
              <mu-icon :value="icon.value"></mu-icon>
            </mu-col>
          </mu-row>
          <mu-row style="margin: 10px 0" align-content="center">
            <audio
              ref="audio"
              @canplay="ready"
              @error="error"
              @timeupdate="UpdateTime"
              @ended="endSong"
              :src=" 'http://music.163.com/song/media/outer/url?id=' + currentSong.id + '.mp3'" ></audio>
            <!--<h1>{{format(currentTime)}}</h1>-->
            <mu-col span="2" style="font-size: 12px;text-align: center">
              {{ format(currentTime) }}
            </mu-col>
            <mu-col span="8" style="position: relative">
              <div ref="progressBar" @click="clickProgressBar">
                <mu-linear-progress
                  mode="determinate"
                  style="margin-top: 7px"
                  color="#eee"
                  :value="progress"></mu-linear-progress>
              </div>
              <div
                @touchstart.prevent="progressTouchStart"
                @touchmove.prevent="progressTouchMove"
                @touchend="progressTouchEnd"
                class="progress-ball"
                style=""
                ref="progressBall"></div>
            </mu-col>
            <mu-col span="2" style="font-size: 12px;text-align: center">
              {{ format(currentSong.dt) }}
            </mu-col>
          </mu-row>
          <mu-row style="text-align: center; margin-bottom: 10px">
            <mu-col
              v-for="(icon,index) in featureIcons"
              @click="playFunct(index)"
              align-self="center"
              :span="icon.width"
              :key="index">
              <mu-icon
                :value="playMode"
                :size= "icon.size"
                v-if="index === 0">
              </mu-icon>
              <mu-icon
                v-else-if="index === 2"
                :size= "icon.size"
                :value="playIcon"></mu-icon>
              <mu-icon
                v-else
                :size= "icon.size"
                :value="icon.value"></mu-icon>
            </mu-col>
          </mu-row>
        </mu-container>
      </div>
    </div>
</template>

<script>
  import lyricParser from 'lyric-parser'
  import DetailHeader from 'components/header/DetailHeader'
  import api from '../../api/index'
  import {playModeConf} from '../../common/js/config'
  import {mapGetters, mapMutations} from 'vuex'
  import {shuffle} from '../../common/js/util'
    export default {
      name: "PlayScreen",
      components: {
        DetailHeader
      },
      computed: {
        playMode() {
          return this.mode === playModeConf.sequence ? 'repeat' : this.mode === playModeConf.loop ? 'repeat_one' : 'shuffle'
        },
        playCd() {
          return this.playing? 'center-img playing' : 'center-img playing pause'
        },
        playIcon() {
          return this.playing? 'pause_circle_outline' : 'play_circle_outline'
        },
        ...mapGetters([
          'fullScreen',
          'playlist',
          'currentSong',
          'currentIndex',
          'playing',
          'mode',
          'sequenceList'
        ])
      },
      data(){
        return {
          touch: {},
          isLyric: false,
          progress: 0,
          progressWidth: 0,
          songReady: false,
          currentTime: 0,
          lyrics: ['暂时没有歌词哟~'],
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
          featureIcons: [
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
          ],
          musicCover: ''
        }
      },
      methods: {
        showLyric() {
          this.isLyric = !this.isLyric
        },
        progressTouchEnd() {
          console.log('end')
          this.$refs.audio.currentTime = (this.currentSong.dt / 1000) * (this.progress / 100)
          this.touch.initiated = false
        },
        progressTouchStart(e) {
          console.log('start')
          this.touch.initiated = true
          this.touch.startX = e.touches[0].pageX
          this.touch.left = this.$refs.progressBall.style.left
          // console.log(this.touch.left + '   start')
        },
        progressTouchMove(e) {
          if (!this.touch.initiated) {
            return
          }
          const deltaX = e.touches[0].pageX - this.touch.startX
          const offsetWidth = Math.min(this.progressWidth, (parseInt(this.touch.left) + deltaX))
          // console.log(this.progressWidth)
          // console.log(parseInt(this.touch.left) + deltaX)
          this.progress = offsetWidth / this.progressWidth * 100
          this.$refs.progressBall.style.left = offsetWidth + 'px'
        },
        clickProgressBar(e) {
          this.progress = e.offsetX / this.progressWidth * 100
          this.$refs.progressBall.style.left = e.offsetX + 'px'
          this.$refs.audio.currentTime = (this.currentSong.dt / 1000) * (this.progress / 100)
        },
        back() {
          // console.log('back')
          this.setFullScreen(false)
        },
        UpdateTime(e) {
          this.currentTime = e.target.currentTime
        },
        format(interval) {
          if (interval > 1000){
            interval = interval / 1000
          } else {
            interval = interval | 0
          }
          const minute = interval / 60 | 0
          const second = interval % 60 | 0
          return `${minute} : ${this.pad(second, 2)}`
        },
        pad(num, n) {
          let len = num.toString().length
          while (len < n) {
            num = '0' + num
            len++
          }
          return num
        },
        changePlayMode() {
          console.log('mode')
          let changeMode = (this.mode + 1) % 3
          let list = null
          if (changeMode === playModeConf.random) {
            list = shuffle(this.sequenceList)
          } else {
            list = this.sequenceList
          }
          this.setPlaylist(list)
          this.setPlayMode(changeMode)
        },
        playFunct(index) {
          switch (index) {
            case 0:
              this.changePlayMode()
                  break
            case 1:
              //pre
              this.preSong()
                  break
            case 2:
              //taggolePlaying
              this.setPlayingState(!this.playing)
                  break
            case 3:
              //next
              this.nextSong()
                  break
            case 4:
              console.log('playitem')
                  break
          }
        },
        nextSong() {
          if (!this.songReady) {
            return
          }
          let playIndex = this.currentIndex + 1
          if (playIndex === this.playlist.length) {
            playIndex = 0
          }
          this.setCurrentIndex(playIndex)
          if (!this.playing){
            this.setPlayingState(!this.playing)
          }
          this.songReady = false
        },
        preSong() {
          if (!this.songReady) {
            return
          }
          let playIndex = this.currentIndex - 1
          if (playIndex === -1) {
            playIndex = this.playlist.length - 1
          }
          this.setCurrentIndex(playIndex)
          if (!this.playing){
            this.setPlayingState(!this.playing)
            console.log(this.playing)
          }
          this.songReady = false
        },
        ready() {
          this.songReady = true
        },
        error() {
          this.songReady = true
        },
        endSong() {
          if (this.mode === playModeConf.loop ) {
            this.$refs.audio.currentTime = 0
            this.$refs.audio.play()
          } else {
            this.nextSong()
          }
        },
        ...mapMutations({
          setFullScreen: 'SET_FULL_SCREEN',
          setPlayingState: 'SET_PLAYING_STATE',
          setCurrentIndex: 'SET_CURRENT_INDEX',
          setPlayMode: 'SET_PLAY_MODE',
          setPlaylist: 'SET_PLAYLIST'
        })
      },
      watch: {
        currentSong() {
          this.$nextTick(() => {
            this.musicCover = this.currentSong.al.picUrl
            this.$refs.audio.play()
            api.getSongLyric(this.currentSong.id)
              .then((res) => {
                this.lyrics = res.data.lrc
                console.log(this.lyrics)
              })
          })
        },
        playing(newPlaying) {
          this.$nextTick(() => {
            const audio = this.$refs.audio
            newPlaying? audio.play() : audio.pause()
          })
        },
        currentTime(newTime) {
          this.$nextTick(() => {
            if (newTime >= 0 && !this.touch.initiated) {
              this.progress = ( newTime / this.currentSong.dt ) * 100000
              this.$refs.progressBall.style.left = `${this.progress / 100 * this.progressWidth}px`
              this.progressWidth = this.$refs.progressBar.clientWidth
              // console.log(this.$refs.progressBall.style.left)
            }
          })
        },
      },
      created() {
        this.$nextTick(() => {
          console.log(this.playlist)
          this.touch = {}
          this.touch.initiated = false
          console.log(this.touch)

        })
      },
      mounted(){

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
    background-color #616161
    background-size cover
    background-position center
    .layer
      width 100%
      height 100%
      background-color rgba(0, 0, 0, .8)
      position absolute
      top 0
      z-index -1
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
      .playing
        animation rotate 20s linear infinite
      .pause
        animation-play-state: paused
      .progress-ball
        width 10px
        height 10px
        border-radius 50%
        background-color #eeeeee
        position absolute
        top 4px
        transition left 0.3s linear
  @keyframes rotate
    0%
      transform rotate(0)
    100%
      transform rotate(360deg)
</style>
