export default {
  state: {
    currentDate: null,
    partners: [
      { _id: '0001', name: 'ООО Конфеты', address: 'МО, Крекшино', shortName: 'Крекшино' },
      { _id: '0002', name: 'ООО Конфеты', address: 'МО, Ногинск', shortName: 'Ногинск' },
      { _id: '0003', name: 'ООО Конфеты', address: 'МО, Химки, адрес склада', shortName: 'Химки' },
      { _id: '0004', name: 'ООО Конфеты', address: 'МО, Крекер, адрес склада', shortName: 'Крекер' },
      { _id: '0005', name: 'ООО Конфеты', address: 'Москва, Красный октябрь', shortName: 'Кр.октябрь' },
      { _id: '0006', name: 'ООО Курица', address: 'МО, Константиново', shortName: 'Константиново' },
      { _id: '0007', name: 'ООО Курица', address: 'МО, Часцы', shortName: 'Часцы' },
      { _id: '0008', name: 'ООО Дикси', address: 'МО, Всходы', shortName: 'Д.Всходы' },
      { _id: '0009', name: 'ООО Дикси', address: 'МО, Внуково', shortName: 'Д.Внуково' },
      { _id: '0010', name: 'Перекресток', address: 'МО, Видное', shortName: 'П.Видное' }
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
    cars: [
      { id: '778', number: '778' },
      { id: '222', number: '222' },
      { id: '333', number: '333' },
      { id: '444', number: '444' },
      { id: '555', number: '555' },
      { id: '666', number: '666' },
      { id: '888', number: '888' },
      { id: '777', number: '777' },
      { id: '999', number: '999' },
      { id: '001', number: '001' },
      { id: '002', number: '002' },
      { id: '003', number: '003' },
      { id: '004', number: '004' },
      { id: '005', number: '005' },
      { id: '006', number: '006' },
      { id: '007', number: '007' },
      { id: '008', number: '008' },
      { id: '009', number: '009' },
      { id: '010', number: '010' },
      { id: '011', number: '011' },
      { id: '012', number: '012' },
      { id: '013', number: '013' },

    ],
    orders: [
      {
        _id: '00001',
        shipper: '0001',
        consignee: '0009',
        shippingDate: '2019-10-21',
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
        shippingDate: '2019-10-22',
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
        shippingDate: '2019-10-22',
        shippingTime: '10:00',
        deliveryDate: '2019-10-22',
        deliveryTime: '19:00',
        carId: '222',
        confirmedDate: '2019-10-26',
        confirmedTimeZone: '03',
        status: 'Проблема'
      },
      {
        _id: '00004',
        shipper: '0003',
        consignee: '0007',
        shippingDate: '2019-10-22',
        shippingTime: '10:00',
        deliveryDate: '2019-10-22',
        deliveryTime: '19:00',
        carId: '222',
        confirmedDate: '2019-10-27',
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
    confirmOrder({ commit }, payload) {
      commit('confirmOrder', payload)
    }
  },
  getters: {
    currentDate: (state) => state.currentDate,
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
      state.orders.filter(item => item.carId === carId && item.confirmedDate === confirmedDate && item.confirmedTimeZone === zone)[0],
    timeZones: (state) => state.timeZones
  }
}
