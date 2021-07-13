import Vue from 'vue'
import App from './App.vue'
import VueGoodTable from 'vue-good-table';

Vue.use(VueGoodTable);

import store from './store'


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store
}).$mount('#app')