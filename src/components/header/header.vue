<template>
  <div id="header">
    <div class="title">
      VueMusic
    </div>
    <div class="icon"></div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
  #header
    position: relative
    height: 44px
    padding-top: 1px
    text-align: center;
    .icon
      width: 30px
      height: 30px
      bg-image('./logo.png')
      background-size: 30px 30px
      margin-top: 6px
      display: inline-block
      vertical-align: top
    .title
      display: inline-block
      vertical-align: top
      line-height: 44px
      color: $color-theme
</style>
