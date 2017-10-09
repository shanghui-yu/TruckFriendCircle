import About from '../pages/about.vue'
import mixins from '../mixins'

Vue.mixin(mixins)

new Vue({
        el: '#root',
        render: h => h(About)
    })