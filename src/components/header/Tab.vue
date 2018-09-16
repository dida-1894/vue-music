<template lang="html">
  <div class="Tab">
    <!-- <mu-container> -->
      <mu-tabs :value.sync="active" color="#d32f2f" indicator-color="#fff" center>
        <mu-tab v-for="(tab,index) in TabItems" :to="tab.r_link" :key="index">{{tab.name}}</mu-tab>
      </mu-tabs>
    <!-- </mu-container> -->
  </div>
</template>

<script>
export default {
  props: {
    TabItems: {
      type: Array,
      default: () => [
        {
          "name": "900",
          r_link: "#"
        }
      ]
    }
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
