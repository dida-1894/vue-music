<template>
    <div class="progress-bar">
      <mu-linear-progress>

      </mu-linear-progress>
      <div class="progress-ball"></div>
    </div>
</template>

<script>
    export default {
        name: "ProgressBar"
    }
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  .progress-ball
    width 10px
    height 10px
    border-radius 50%
    background-color #eeeeee
    position absolute
    top 4px
    transition left 0.3s linear
</style>
