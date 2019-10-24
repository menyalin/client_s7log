export default {
  state: {
    partners: [
      { _id: '0001', name: 'ООО Конфеты', address: 'МО, Крекшино' },
      { _id: '0002', name: 'ООО Конфеты', address: 'МО, Ногинск' },
      { _id: '0003', name: 'ООО Конфеты', address: 'МО, Химки, адрес склада' },
      { _id: '0004', name: 'ООО Конфеты', address: 'МО, Крекер, адрес склада' },
      { _id: '0005', name: 'ООО Конфеты', address: 'Москва, Красный октябрь' },
      { _id: '0006', name: 'ООО Курица', address: 'МО, Константиново' },
      { _id: '0007', name: 'ООО Курица', address: 'МО, Часцы' },
      { _id: '0008', name: 'ООО Дикси', address: 'МО, Всходы' },
      { _id: '0009', name: 'ООО Дикси', address: 'МО, Внуково' },
      { _id: '0010', name: 'Перекресток', address: 'МО, Видное' }
    ],
    vehicleType: [
      { value: '10tn', text: '10тн' },
      { value: '20tn', text: '20тн' }
    ],
    cars: [
      { id: '0001', number: '778' },
      { id: '0002', number: '222' },
      { id: '0003', number: '333' },
      { id: '0004', number: '444' }
    ],
    orders: [
      {
        _id: '00001',
        shipper: 'Крекшино',
        consignee: 'Д. Внуково',
        shippingDate: '2019-10-21',
        shippingTime: '08:00',
        deliveryDate: '2019-10-21',
        deliverytime: '15:00',
        carId: null,
        confirmedDate: null,
        confirmedTimeZone: null
      },
      {
        _id: '00002',
        shipper: 'Крекшино',
        consignee: 'Т Дмитров',
        shippingDate: '2019-10-22',
        shippingTime: '10:00',
        deliveryDate: '2019-10-22',
        deliverytime: '19:00',
        carId: null,
        confirmedDate: null,
        confirmedTimeZone: null
      }
    ]
  },
  mutations: {
    resetCarInOrder: (state, orderId) => {
      let order = state.orders.find(item => item._id === orderId)
      order.carId = null
      order.confirmedDate= null
      order.confirmedTimeZone = null
    }

  },
  actions: {
    resetCarInOrder: ({ commit }, orderId) => {
      commit('resetCarInOrder', orderId)
    }
  },
  getters: {
    partnersForAutocomplite: ({ partners }) => {
      return partners.map(item => ({
        value: item._id,
        text: item.address + ' - <' + item.name + '>'
      }))
    },
    vehicleType: state => state.vehicleType,
    cars: state => state,
    notConfirmedOrders: state => state.orders.filter(item => !item.carId)
  }
}
