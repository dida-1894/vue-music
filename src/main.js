// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// var VueTouch = require("vue-touch")
import Vue from 'vue'
import Vuex from 'vuex'
import MuseUI from 'muse-ui'
import VueLazyload from 'vue-lazyload'
import store from './store'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
import './common/dist/muse-ui.css'

Vue.use(VueLazyload, {
  loading: require('./assets/logo.png'),
  error: require('./assets/logo.png')
})
Vue.use(Vuex)
Vue.use(MuseUI)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
