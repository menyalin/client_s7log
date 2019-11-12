import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import ru from 'vuetify/es5/locale/ru'

Vue.use(Vuetify)

const vuetify =  new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#414770',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#ff7733'
      }
    }
  },
  lang: {
    locales: { ru },
    current: 'ru'
  },
  icons: {
    iconfont: 'mdi'
  }
})



export default vuetify
