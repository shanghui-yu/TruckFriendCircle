import AddTruck from '../pages/add-Truck.vue'
import store from '../store'
import mixins from '../mixins'
Vue.mixin(mixins)
new Vue({
        el: '#root',
        store:store,
        render: h => h(AddTruck)
    })