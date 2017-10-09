// import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home.vue'
import HomeNew from './pages/home-new.vue'
import HomeVideo from './pages/home-video.vue'
import HomeFollow from './pages/home-follow.vue'
import HomeNeanav from './pages/home-neanav.vue'
import HomeNeatruck from './pages/home-neatruck.vue'
Vue.use(Router)



export default new Router({
  routes: [
    { path: '/home',component: Home },
    { path: '/HomeNew',component: HomeNew},
    { path: '/HomeVideo',component: HomeVideo},
    { path: '/HomeFollow',component: HomeFollow},
    { path: '/HomeNeanav',component: HomeNeanav},
    { path: '/HomeNeatruck',component: HomeNeatruck},
    { path: '/', redirect: '/home' }
  ]
})
