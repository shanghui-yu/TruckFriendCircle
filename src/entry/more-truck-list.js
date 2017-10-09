import MoreTruckList from '../pages/more-Truck-list.vue'
import store from '../store'
import mixins from '../mixins'
Vue.mixin(mixins)
new Vue({
        el: '#root',
        store:store,
        render: h => h(MoreTruckList)
    })