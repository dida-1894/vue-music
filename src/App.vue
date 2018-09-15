<template>
  <div id="app">
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>

<script>
import MyHeader from 'components/header/header'
export default {
  name: 'App',
  components: {
    MyHeader
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
