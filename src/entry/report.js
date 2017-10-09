import Report from '../pages/report.vue'
import mixins from '../mixins'
Vue.mixin(mixins)
new Vue({
        el: '#root',
        render: h => h(Report)
    })