<template>
  <div class="high-song-recommend">
    <main-header>
        <mu-icon
          value="keyboard_arrow_left"
          color="#fff"
          slot="leftIcon"
          size="30"
          @click="back"></mu-icon>
      <h2 style="text-align: center;color: #f5f5f5;font-weight: bolder" slot="headerMiddle">歌单</h2>
    </main-header>
      <b-scroll
        :data="songlist"
        :listenScroll="true"
        class="wrapper"
        :pullup="pullup"
        @scrollToEnd="loadMore"
        ref="wrapper">
        <div class="content">
          <mu-row style="margin: 8px 0px">
            <mu-col span="4">
              <mu-button @click.native="openSonglistChoice" round color="#D32F2F">
                <span>全部歌单</span>
                <mu-icon value="chevron_right"></mu-icon>
              </mu-button>
            </mu-col>
          </mu-row>
          <mu-row gutter class="list-content">
            <mu-col v-for="(item, index) in songlist" span="6" :key="index" style="margin: 4px 0px">
              <mu-card>
                <mu-card-media :sub-title="item.creator.nickname">
                  <img v-lazy="item.coverImgUrl">
                </mu-card-media>
                <mu-card-title :sub-title="item.name" style="padding: 4px"></mu-card-title>
              </mu-card>
            </mu-col>
          </mu-row>
        </div>
      </b-scroll>
    <main-footer></main-footer>
    <mu-dialog transition="slide-bottom" fullscreen :open="openFullscreen">
      <mu-appbar color="#D32F2F" title="类型选择">
        <mu-button slot="left" icon @click.native="closeSonglistChoice">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" flat  @click.native="closeSonglistChoice">
          取消
        </mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        
      </div>
    </mu-dialog>
  </div>
</template>

<script>
  import MainHeader from 'components/header/MainHeader'
  import MainFooter from 'components/header/MainFooter'
  import BScroll from 'components/header/Scroll'
  import Card from './Card'
  import api from '../../api/index'
    export default {
      components: {
        BScroll,
        Card,
        MainHeader,
        MainFooter
      },
      data() {
        return {
          openFullscreen: false,
          songlist: [],
          listenScroll: true,
          pullup: true,
          updateTime: 0,
          limit: 10
        }
      },
      methods:{
        back() {
          this.$router.go(-1)
        },
        openSonglistChoice() {
          this.openFullscreen = true
        },
        closeSonglistChoice() {
          this.openFullscreen = false
        },
        scroll(pos) {
        },
        loadMore: function () {
          let updateTime = this.updateTime
          api.getHighlyqualitySonglist(updateTime, this.limit)
            .then((res) => {
              let dataResult = res.data.playlists
              this.updateTime = dataResult[dataResult.length-1].updateTime
              console.log(res.data.playlists)
              this.songlist = dataResult.reduce((coll, item) => {
                coll.push(item)
                return coll
              }, this.songlist)
            })
        }
      },
      created() {
        this.$nextTick(() => {
          this.pullup = true
          api.getHighlyqualitySonglist("" ,this.limit,)
            .then((res) => {
              //
              let dataResult = res.data.playlists
              this.songlist = dataResult
              this.updateTime = dataResult[dataResult.length -1].updateTime
            })
        })
      }
    }
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  .high-song-recommend
    width 100%
    height 100%
    .wrapper
      overflow hidden
      padding 0px 8px
      height calc(100% - 106px)
      .content
        padding-top 4px
</style>
