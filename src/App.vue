<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <play-screen></play-screen>
  </div>
</template>

<script>
  import PlayScreen from 'components/play/PlayScreen'
export default {
  name: 'App',
  components: {
    PlayScreen
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    position relative
    overflow hidden
</style>
