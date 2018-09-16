<template lang="html">
  <div class="box">
      <img src="" alt="">
    <div class="title">
      {{}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    BoxMsg: {
      type: Object
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .box
    img
      max-width: 100%
      max-height: 100%
    .title
      font-size: 12px
      overflow:hidden
      text-overflow:ellipsis
      display:-webkit-box
      -webkit-box-orient:vertical
      -webkit-line-clamp:2

</style>
