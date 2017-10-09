import PeopleList from '../pages/people-list.vue'
import mixins from '../mixins'
import store from '../store'
Vue.mixin(mixins)
new Vue({
        el: '#root',
        store,
        render: h => h(PeopleList)
    })