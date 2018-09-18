// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// var VueTouch = require("vue-touch")
import Vue from 'vue'
import App from './App'
import router from './router'
import VueTouch from 'vue-touch'
import 'common/stylus/index.styl'
import MuseUI from 'muse-ui'
import './common/dist/muse-ui.css'

// console.log(VueTouch)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(MuseUI)

// import 'muse-ui/lib/styles/base.less'
// import {
//   Dialog,
//   BottomNav,
//   BottomSheet,
//   Grid,
//   Icon,
//   LoadMore,
//   Tab,
//   Radio,
//   Avatar
// } from 'muse-ui'
// import 'muse-ui/lib/styles/theme.less'
//
// Vue.use(Dialog)
// Vue.use(BottomNav)
// Vue.use(BottomSheet)
// Vue.use(Grid)
// Vue.use(Icon)
// Vue.use(LoadMore)
// Vue.use(Tab)
// Vue.use(Radio)
// Vue.use(Avatar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
