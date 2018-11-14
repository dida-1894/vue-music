<template lang="html">
  <mu-container>
    <mu-row>
      <mu-col @click="selectRecommend(item.name)" span="3" v-for="(item,index) in Icon" :key="index">
        <div class="icon-box">
          <mu-icon size="30" :value="item.icon" color="#fff"></mu-icon>
        </div>
        <div class="icon-text">
          {{item.name}}
        </div>
      </mu-col>
    </mu-row>
  </mu-container>
</template>

<script>
export default {
  props: {
    Icon: {
      type: Array,
      default: () => [
        {
          name: "私人FM",
          icon: "radio"
        },
        {
          name: "每日推荐",
          icon: "date_range"
        },
        {
          name: "歌单",
          icon: "notes"
        },
        {
          name: "排行榜",
          icon: "list_alt"
        }
      ]
    }
  },
  methods: {
    selectRecommend(name) {
      console.log(name)
      this.$emit('selectRecommend', name)
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable.styl"
  .icon-box
    width: 50px
    height: 50px
    margin: 0 auto
    border-radius: 50%
    text-align: center
    padding-top: 10px
    background-color: $color-background
    color: $color-text
  .icon-text
    width: 100%
    text-align: center
    font-size: 12px
</style>
