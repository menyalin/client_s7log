export default {
  state: {
    currentDate: null,
    addresses: [],
    statuses: [
      { id: '01', title: 'Надо получить' },
      { id: '02', title: 'ОЧЕНЬ Надо получить' },
      { id: '03', title: 'Получен' },
      { id: '04', title: 'Сообщен водителю' },
      { id: '05', title: 'Подтвержден клиенту' },
      { id: '06', title: 'На погрузке' },
      { id: '07', title: 'На выгрузке' },
      { id: '08', title: 'Выполнен' },
      { id: '09', title: 'Мы отказались' },
      { id: '10', title: 'Клиент снял заказ' }
    ],
    schedule: [
      { 'date': '2019-10-29', 'manager': "Логист1" },
      { 'date': '2019-10-30', 'manager': "Логист1" },
      { 'date': '2019-10-31', 'manager': "Логист2" },
      { 'date': '2019-11-01', 'manager': "Логист2" },
      { 'date': '2019-11-02', 'manager': "Логист1" },
      { 'date': '2019-11-03', 'manager': "Логист1" },
      { 'date': '2019-11-04', 'manager': "Логист2" },
      { 'date': '2019-11-05', 'manager': "Логист2" },
      { 'date': '2019-11-06', 'manager': "Логист1" },
      { 'date': '2019-11-07', 'manager': "Логист1" },
      { 'date': '2019-11-08', 'manager': "Логист2" },
      { 'date': '2019-11-09', 'manager': "Логист2" },
    ],
    vehicleType: [
      { value: '10tn', text: '10тн' },
      { value: '20tn', text: '20тн' }
    ],
    timeZones: [
      { id: '01', title: '00-06' },
      { id: '02', title: '06-12' },
      { id: '03', title: '12-18' },
      { id: '04', title: '18-24' }
    ],
    orders: []
  },
  mutations: {
    setAddresses: (state, payload) => {
      state.addresses = payload
    },
    addAddress: (state, payload) => {
      state.addresses.push(payload)
    },
    updateAddress: (state, updatedAddress) => {
      let adr = state.addresses.find(item => item.id === updatedAddress.id)
      adr = Object.assign(adr, updatedAddress)
    },
    addOrder: (state, orderAdded) => {
      state.orders.push(orderAdded)
    },
    resetCarInOrder: (state, orderId) => {
      let order = state.orders.find(item => item.id === orderId)
      order.confirmedCarId = null
      order.confirmDate = null
      order.confirmTime = null
    },
    confirmOrder: (state, { id, confirmedCarId, confirmDate, confirmTime }) => {
      let order = state.orders.find(item => item.id === id)
      order.confirmedCarId = confirmedCarId
      order.confirmDate = confirmDate
      order.confirmTime = confirmTime
    },
    setCurrentDate: (state, payload) => {
      state.currentDate = payload
    },

    _updateOrder: (state, { id, status, shipper, consignee }) => {
      let order = state.orders.find(item => item._id === id)
      Object.assign(order, { status, shipper, consignee })
    },
    setOrders: (state, payload) => {
      state.orders = payload
    }
  },
  actions: {
    _updateOrder: ({ commit }, payload) => {
      commit('updateOrder', payload)
    },
    resetCarInOrder: ({ commit }, orderId) => {
      commit('resetCarInOrder', orderId)
    },
    confirmOrder ({ commit }, payload) {
      commit('confirmOrder', payload)
    }
  },
  getters: {
    currentDate: (state) => state.currentDate,
    personOnDuty: ({ schedule }) => (date) => schedule.find(item => item.date === date) || 'не задан',
    vehicleType: state => state.vehicleType,
    cars: state => state.cars,
    notConfirmedOrders: (state) => (carType) => state.orders.filter(item => ((!item.confirmedCarId || !item.confirmTime) && item.carType === carType)),
    ordersByCarAndConfirmDateZone: (state) => (confirmedCarId, confirmDate, confirmTime) =>
      state.orders.filter(item => item.confirmedCarId === confirmedCarId && item.confirmDate === confirmDate && item.confirmTime === confirmTime)[ 0 ],
    timeZones: (state) => state.timeZones,
    statuses: (state) => state.statuses,
    statusTitleById: (state) => (id) => state.statuses.find(item => item.id === id),
    isAddressesUpload: (state) => !!state.addresses.length,
    addressById: (state) => (id) => {
      if (state.addresses.length && id)
        return state.addresses.find(item => item.id === id)
      else return null
    }

  }
}
