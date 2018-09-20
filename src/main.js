// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// var VueTouch = require("vue-touch")
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueTouch from 'vue-touch'
import 'common/stylus/index.styl'
import MuseUI from 'muse-ui'
import './common/dist/muse-ui.css'

// Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(MuseUI)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
