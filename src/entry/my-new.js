import MyNews from '../pages/my-news.vue'
import mixins from '../mixins'
Vue.mixin(mixins)
new Vue({
        el: '#root',
        render: h => h(MyNews)
    })