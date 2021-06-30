import Vue from 'vue'
//import Bootstrap from 'bootstrap'
import BootstrapVue from 'bootstrap-vue'
//import '@babel/polyfill'
//import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

//window.axios = require('axios');
//window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//const axios = require('axios');

// My app
import router from './router/index'
import store from './store/index'
import App from './App.vue'

Vue.config.productionTip = false
new Vue({
  render: h => h(App), store, router
}).$mount('#app')
