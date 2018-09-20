import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import SongListDetail from 'components/rank/SongListDetail'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import Radio from 'components/recommend/Radio'
import Frieds from 'components/frieds/Frieds'
import Video from 'components/video/Video'
import Mine from 'components/mine/Mine'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/singer",
      component: Singer
    },
    {
      path: "/palylist/detail",
      name: "SongListDetail",
      component: SongListDetail
    },
    {
      path: "/video",
      component: Video
    },
    {
      path: "/mine",
      component: Mine
    },
    {
      path: "/frieds",
      component: Frieds
    },
    {
      path: "/",
      component: Recommend,
      children: [
        {name: 'radio', path: "radio", component: require('components/recommend/Radio')},

      ]
    },
    {
      path: "/search",
      component: Search
    }
  ]
})
