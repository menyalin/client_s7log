export default {
  state: {
    currentDate: null,
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
    orders: [
      {
        _id: '00001',
        shipper: '0001',
        consignee: '0009',
        shippingDate: '2019-11-03',
        shippingTime: '10:00',
        deliveryDate: '2019-10-21',
        deliveryTime: '15:00',
        carId: false,
        confirmedDate: null,
        confirmedTimeZone: null,
        status: 'Новый'

      },
      {
        _id: '00002',
        shipper: '0002',
        consignee: '0010',
        shippingDate: '2019-11-01',
        shippingTime: '10:00',
        deliveryDate: '2019-10-22',
        deliveryTime: '19:00',
        carId: false,
        confirmedDate: null,
        confirmedTimeZone: null,
        status: 'Новый'
      },
      {
        _id: '00003',
        shipper: '0005',
        consignee: '0009',
        shippingDate: '2019-11-02',
        shippingTime: '10:00',
        deliveryDate: '2019-10-22',
        deliveryTime: '19:00',
        carId: '222',
        confirmedDate: '2019-11-02',
        confirmedTimeZone: '03',
        status: 'Проблема'
      },
      {
        _id: '00004',
        shipper: '0003',
        consignee: '0007',
        shippingDate: '2019-11-01',
        shippingTime: '10:00',
        deliveryDate: '2019-10-22',
        deliveryTime: '19:00',
        carId: '222',
        confirmedDate: '2019-11-01',
        confirmedTimeZone: '02',
        status: 'На погрузке'
      }
    ]
  },
  mutations: {
    resetCarInOrder: (state, orderId) => {
      let order = state.orders.find(item => item._id === orderId)
      order.carId = null
      order.confirmedDate = null
      order.confirmedTimeZone = null
    },
    confirmOrder: (state, { orderId, carId, date, zoneId }) => {
      let order = state.orders.find(item => item._id === orderId)
      order.carId = carId
      order.confirmedDate = date
      order.confirmedTimeZone = zoneId
    },
    setCurrentDate: (state, payload) => {
      state.currentDate = payload
    },
    updateOrder: (state, { id, status, shipper, consignee }) => {
      let order = state.orders.find(item => item._id === id)
      Object.assign(order, { status, shipper, consignee })
    }
  },
  actions: {
    updateOrder: ({ commit }, payload) => {
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
    partnersForAutocomplite: ({ partners }) => {
      return partners.map(item => ({
        value: item._id,
        text: item.address + ' - <' + item.name + '>'
      }))
    },
    partnersById: ({ partners }) => (id) => partners.find(item => item._id === id),
    vehicleType: state => state.vehicleType,
    cars: state => state.cars,
    notConfirmedOrders: (state) => state.orders.filter(item => !(item.carId)),
    ordersByCarAndConfirmDateZone: (state) => (carId, confirmedDate, zone) =>
      state.orders.filter(item => item.carId === carId && item.confirmedDate === confirmedDate && item.confirmedTimeZone === zone)[ 0 ],
    timeZones: (state) => state.timeZones,
    statuses: (state) => state.statuses,
    statusTitleById: (state) => (id) => state.statuses.find(item => item.id === id)
  }
}
