import Vue from 'vue'
import Vuex from 'vuex'
import Common from './Common'
import Auth from './Auth'
import Order from './Order'
import Car from './Car'
import Driver from './Driver'
import Users from './Users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Common,
    Order,
    Car,
    Driver,
    Users
  }
})
