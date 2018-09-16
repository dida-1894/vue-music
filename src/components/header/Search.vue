<template lang="html">
  <div class="search">
    <input type="text" name="" value="" placeholder="大家都在搜索 五月天">
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/stylus/variable.styl"
  .search
    width: 100%
    text-align: center
    input
      width: 80%
      height: 30px
      border: 0px
      background-color: $color-background-d
      font-size: $font-size-small-s
      border-radius: 15px
      line-height: 30px
      text-align: center

</style>
