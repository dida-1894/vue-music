<template>
    <div class="PlayScreen" v-show="playlist.length > 0">
      <div class="normal-player" v-show="fullScreen">
        播放器
      </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
      name: "PlayScreen",
      computed: {
        ...mapGetters([
          'fullScreen',
          'playlist',
        ])
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .PlayScreen
    width 100%
    height 100%
    background-color #616161
    color #eeeeee
</style>
