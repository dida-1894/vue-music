<template>
  <div class="tracks">
    <mu-row
      class="playlist"
      align-items="center"
      v-for="(play,index) in tracks"
      @click="playSong(play, index)"
      :key="index">
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
</template>

<script>
    export default {
      name: "SongList",
      props: {
        tracks: {
          type:  Array,
          default: null
        }
      },
      methods: {
        playSong(song, index){
          this.$emit('playSong', song, index)
        }
      },
      created() {
        this.$nextTick(() => {
          console.log(this.tracks instanceof Array)
        })
      }
    }
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  @import '~common/stylus/variable.styl'
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
