<template lang="html">
  <div class="search" style="height: 100%">
    <mu-appbar color="#d32f2f">
      <mu-text-field
        v-model="searchThings"
        placeholder="请输入..."
        color="#fff"
        full-width
        :action-icon="!searchThings ? '' : 'highlight_off'"
        :action-click="() => this.searchThings='' "
        icon="search"></mu-text-field>
      <mu-button flat slot="right" @click="cancel">取消</mu-button>
    </mu-appbar>
    <div class="content" style="padding: 20px">
        <mu-row justify-content="center" align-item="center" style="margin-bottom: 20px">
          <mu-col fill>
            <h6 style="color: #616161;margin-bottom: 10px" >热门搜索</h6>
          </mu-col>
          <mu-col align-self="center">
            <mu-button
              round
              @click="selectHots(index)"
              color="#eee"
              v-for="(hot, index) in hots"
              style="margin: 5px;color: #616161"
              :key="index">{{hot.first}}</mu-button>
          </mu-col>
        </mu-row>
        <mu-row justify-content="center" align-item="center">
          <mu-col fill>
            <h6 style="color: #616161">搜索记录</h6>
          </mu-col>
          <mu-col align-self="center">
            <mu-button round color="#eee"></mu-button>
          </mu-col>
        </mu-row>
      </div>
    <mu-bottom-sheet :open.sync="searchResult" ref="searchPeal" style="height: calc(100% - 56px)">
      <b-scroll
        :data = "[searchSongs]"
        :listenScroll = "listenScroll"
        style="height: 100%;overflow: hidden"
        class="wrapper"
        refs="wrappers">
        <div class="content">
          <song-list
            @playSong="playSong"
            :tracks="searchSongs"></song-list>
        </div>
      </b-scroll>
    </mu-bottom-sheet>
  </div>
</template>

<script>
  import api from '../../api/index'
  import SongList from 'components/header/SongList'
  import BScroll from 'components/header/Scroll'
  import {mapGetters, mapActions} from 'vuex'
export default {
  components: {
    BScroll,
    SongList
  },
  data() {
    return {
      searchThings: '',
      hots: [],
      searchResult: false,
      searchSongs: [],
      listenScroll: true
    }
  },
  methods: {
    cancel() {
      this.searchThings = ''
      this.$router.go(-1)
    },
    ...mapActions([
      'selectPlay'
    ]),
    playSong(song, index) {
      this.selectPlay({
        list: this.searchSongs,
        index
      })
    },
    selectHots(index) {
      this.searchThings = this.hots[index].first
      api.getSearch(this.searchThings)
        .then((res) => {
          this.searchSongs = res.data.result.songs
          console.log(this.searchSongs)
          this.searchResult = true
          // console.log(this.searchSongs instanceof Array)
        })
    }
  },
  created() {
    this.$nextTick(() => {
      this.listenScroll = true
      api.getSearchHot()
        .then((res) => {
          let dataResult = res.data.result.hots
          this.hots = dataResult
          // console.log(res.data.result.hots)
        })
    })
  }
}
</script>

<style lang="css">
</style>
