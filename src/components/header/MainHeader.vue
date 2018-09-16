<template lang="html">
  <div id="main-header">
    <mu-container>
      <mu-row>
        <mu-col span="1">
          <mu-icon :value="iconName" color="#fff" left></mu-icon>
        </mu-col>
        <mu-col span="10">
          <slot name="headerMiddle">
            <h2 class="headerMiddle">headerMiddle</h2>
          </slot>
        </mu-col>
        <mu-col span="1">
          <mu-icon value="graphic_eq" color="#fff"></mu-icon>
        </mu-col>
      </mu-row>
    </mu-container>
  </div>
</template>

<script>
import Search from "components/header/Search"
export default {
  components: {
    Search
  },
  props:{
    iconName: {
      type: String,
      default: "chevron_left"
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
  #main-header
    background-color: $color-background
    padding: 10px
    .headerMiddle
      text-align: center
      color: $color-text
      line-height: 30px
      font-size: $font-size-small-large
</style>
