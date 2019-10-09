import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//Bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

//Configuracion de bootstrap
Vue.use(BootstrapVue)

//Configuracion de Aaxios
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://localhost:3000/api';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
