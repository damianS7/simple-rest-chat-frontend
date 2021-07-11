import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import './plugins/bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// My app
import router from './router/index'
import store from './store/index'
import App from './App.vue'

Vue.config.productionTip = false
new Vue({
  render: h => h(App), store, router
}).$mount('#app')
