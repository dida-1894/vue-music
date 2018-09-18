<template lang="html">
  <div class="header">
    <mu-container>
      <mu-row>
          <mu-col span="1">
            <slot name="leftIcon">
              <!-- <mu-icon value="keyboard_arrow_left" size="40" color="#fff" onclick="javascript:history.back(-1);"></mu-icon> -->
            </slot>
          </mu-col>
        <mu-col span="10">
          <h2>{{HeadLine}}</h2>
        </mu-col>
      </mu-row>
    </mu-container>
  </div>
</template>

<script>
export default {
  props: {
    HeadLine: {
      type: String,
      default: "歌单"
    }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable.styl"
.header
  background-color: $background-color-d
  h2
    color: $color-text
    font-size: $font-size-small-large
    text-align: center;
    line-height: 46px
    vertical-align: middle
</style>
