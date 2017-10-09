import Lookimg from '../pages/look-img.vue'
import mixins from '../mixins'
Vue.mixin(mixins)
new Vue({
        el: '#root',
        render: h => h(Lookimg)
    })