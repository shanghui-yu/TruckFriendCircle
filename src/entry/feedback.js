import FeedBack from '../pages/feedback.vue'
import mixins from '../mixins'
Vue.mixin(mixins)
new Vue({
        el: '#root',
        render: h => h(FeedBack)
    })