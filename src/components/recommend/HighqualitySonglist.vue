<template>
  <div class="high-song-recommend">
    <main-header>
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
              <mu-button round color="#D32F2F">
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
          songlist: [],
          listenScroll: true,
          pullup: true,
          updateTime: 0
        }
      },
      methods:{
        scroll(pos) {
        },
        loadMore: function () {
          let updateTime = this.updateTime
          console.log(updateTime)
          api.getHighlyqualitySonglist(updateTime)
            .then((res) => {
              let dataResult = res.data.playlists
              this.updateTime = dataResult[0].updateTime
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
          api.getHighlyqualitySonglist()
            .then((res) => {
              //
              let dataResult = res.data.playlists
              this.songlist = dataResult
              this.updateTime = res.data.playlists[0].updateTime
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
