import Vue from 'vue'
import Vuex from 'vuex'
import Common from './Common'
import Auth from './Auth'
import Chat from './Chat'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Common,
    Chat
  }
})
