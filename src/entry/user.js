import User from '../pages/user.vue'
import store from '../store/'
import mixins from '../mixins'
Vue.mixin(mixins)
new Vue({
        el: '#root',
        store,
        render: h => h(User)
    })