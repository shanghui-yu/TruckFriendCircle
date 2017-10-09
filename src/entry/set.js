import SetUp from '../pages/set.vue'
import mixins from '../mixins'
Vue.mixin(mixins)
new Vue({
        el: '#root',
        render: h => h(SetUp)
    })