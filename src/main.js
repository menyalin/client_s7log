import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { createProvider } from './vue-apollo'
import vuetify from './plugins/vuetify'

import Vuelidate from 'vuelidate'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  vuetify,
  created () {
    if (localStorage.token && localStorage.getItem('token') !== '') {
      store.dispatch('getCurrentUser')
    }
  },
  render: h => h(App)
}).$mount('#app')
