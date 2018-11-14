<template>
  <div>
    <main-header>
      <h2 slot="headerMiddle">歌单</h2>
    </main-header>
    <card :col="6" :content="songlist"></card>
    <main-footer></main-footer>
  </div>
</template>

<script>
  import MainHeader from 'components/header/MainHeader'
  import MainFooter from 'components/header/MainFooter'
  import Card from './Card'
  import api from '../../api/index'
    export default {
      components: {
        Card,
        MainHeader,
        MainFooter
      },
      data() {
        return {
          songlist: {
            title: "推荐歌单",
            list: []
          },
        }
      },
      created() {
        this.$nextTick(() => {
          api.getHighlyqualitySonglist()
            .then((res) => {
              let dataResult = res.data.playlists
              this.songlist.list = dataResult
              console.log(this.songlist.list)
            })
        })
      }
    }
</script>

<style scoped>

</style>
