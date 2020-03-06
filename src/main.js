import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { createProvider } from './vue-apollo'
import vuetify from './plugins/vuetify'
import VuetifyConfirm from 'vuetify-confirm'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import { unixDateToStr, dateRangeToStr } from './filters'

Vue.config.productionTip = false
Vue.use(VueTheMask)
Vue.use(Vuelidate)
Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: 'Да',
  buttonFalseText: 'Нет',
  color: 'info',
  icon: 'mdi-alert-octagram',
  title: 'Warning',
  width: 350,
})
Vue.filter('unixDateToStr', unixDateToStr)
Vue.filter('dateRangeToStr', dateRangeToStr)

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
