<template>
  <div class="Card">
    <h2 class="re-title">
      <span>{{content.title}}</span>
      <mu-icon value="keyboard_arrow_right" style="vertical-align:middle"></mu-icon>
    </h2>
    <mu-row gutter>
      <mu-col :span="col" v-for="(item, index) in content.list" :key="index" @click="getDetail(item)">
        <!-- <router-link tag="div"
        :to="{ name: 'SongListDetail', params: {id:item.id} }"> -->
          <img v-lazy="item.picUrl" alt="">
          <div class="re-name">
            {{item.name}}
          </div>
        <!-- </router-link> -->
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: {}
    },
    col: {
      type: Number,
      default: 4
    }
  },
  methods: {
    getDetail(item) {
      switch (item.type) {
        case 0:
          this.$emit('goToSonglistDetail', item.id)
          break
        case 1:
          console.log('Radio')
        default:

      }
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.Card
  img
    max-width: 100%
  .re-name
    font-size: 12px
    margin-bottom: 10px
    overflow:hidden
    text-overflow:ellipsis
    display:-webkit-box
    -webkit-box-orient:vertical
    -webkit-line-clamp:2
  .re-title
    height: 30px
    line-height: 30px
    span
      vertical-align: middle
</style>
