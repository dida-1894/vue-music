<template>
  <footer>
    <mu-bottom-nav color="#d32f2f">
      <mu-bottom-nav-item title="发现" icon="library_music"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="视频" icon="ondemand_video"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="我的" icon="music_note"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="朋友" icon="people"></mu-bottom-nav-item>
      <mu-bottom-nav-item title="账号" icon="perm_identity"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </footer>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
footer
  width: 100%
  overflow: hidden
  position: fixed
  bottom: 0px
  z-index 99
</style>
