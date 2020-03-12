export default {
  state: {
    userRoles: [],
    schedule: [],
  },
  mutations: {
    setUserRoles: (state, payload) => {
      state.userRoles = payload
    },
    setSchedule: (state, payload) => {
      state.schedule = payload
    },
    scheduleUpdated: (state, payload) => {
      let scheduleItem = state.schedule.find(item => item.id === payload.id)
      if (scheduleItem) scheduleItem = Object.assign(scheduleItem, payload)
      else state.schedule.push(payload)
    },
    deletedSchedule: ({ schedule }, id) => {
      const idx = schedule.findIndex(i => i.id === id)
      if (idx !== -1) schedule.splice(idx, 1)
    },
    updateUserRoles: (state, role) => {
      let staffItem = state.userRoles.find(item => item.id === role.id)
      if (staffItem) staffItem = Object.assign({}, staffItem, role)
      else state.userRoles.push(role)
    },
    deleteUserRoles: ({ userRoles }, roleId) => {
      const idx = userRoles.findIndex(i => i.id === roleId)
      if (idx !== -1) userRoles.splice(idx, 1)
    },
  },
  actions: {

  },
  getters: {
    personOnDuty: ({ schedule }) => (date) => schedule.find(item => item.date === date) || 'не задан',
    dispatchersStaff: ({ userRoles }) => {
      if (userRoles.length)
        return userRoles
          .filter(item => (item.role === 'dispatcher' && item.isActive))
          .map(item => ({ userId: item.userId, userName: item.user.name, userEmail: item.user.email }))
      else null
    },
    dutyDispatcher: (state) => (date) => state.schedule.find(item => item.date === date),
  }
}