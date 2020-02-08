import { apolloClient } from '../vue-apollo'

export default {
  state: {
    drivers: []
  },
  mutations: {
    setDrivers: (state, payload) => {
      state.drivers = payload
    },
    driverUpdated: ({ drivers }, payload) => {
      let driver = drivers.find(item => item.id === payload.id)
      if (driver) driver = Object.assign(driver, {}, payload)
      else drivers.push(payload)
    },
    driverDeleted: ({ drivers }, id) => {
      drivers.splice(drivers.findIndex(item => item.id === id), 1)
    }
  },
  actions: {},
  getters: {
    drivers: ({ drivers }) => drivers,
    activeDrivers: ({ drivers }) => drivers.filter(item => item.isActive)
  }
}