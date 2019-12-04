import { apolloClient } from '../vue-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

const updateOrderMutation = gql`
   mutation updateOrder(
    $id: ID
    $carType: String
    $confirmDate: String
    $confirmTime: String
    $shipperId: String
    $consigneeId: String
    $status: String
    $note: String
    $shippingDate: String
    $shippingTime: String
    $deliveryDate: String
    $deliveryTime: String
    $confirmedCarId: String
    $isDriverNotified: Boolean
    $isClientNotified: Boolean
  ) {
    updateOrder(
      id: $id
      carType: $carType
      confirmDate: $confirmDate
      confirmTime: $confirmTime
      shipperId: $shipperId
      consigneeId: $consigneeId
      status: $status
      note: $note
      shippingDate: $shippingDate
      shippingTime: $shippingTime
      deliveryDate: $deliveryDate
      deliveryTime: $deliveryTime
      confirmedCarId: $confirmedCarId
      isDriverNotified: $isDriverNotified
      isClientNotified: $isClientNotified
    ) {
      id
      number
      carType
      confirmDate
      confirmTime
      confirmedCarId
    }
  }
`


export default {
  state: {
    currentDate: null,
    addresses: [],
    cars: [],
    staff: [],
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
    schedule: [],
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
    setCars: (state, payload) => {
      state.cars = payload
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
    updateOrder: (state, orderUpdated) => {
      let order = state.orders.find(item => item.id === orderUpdated.id)
      if (order) {
        Object.assign(order, orderUpdated)
      } else {
        state.orders.push(orderUpdated)
      }
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
    setOrders: (state, payload) => {
      state.orders = payload
    },
    setStaff: (state, payload) => {
      state.staff = payload
    },
    setSchedule: (state, payload) => {
      state.schedule = payload
    }
  },
  actions: {
    updateOrder: ({ commit }, payload) => {
      commit('updateOrder', payload)
    },
    resetCarInOrder: ({ commit }, orderId) => {
      apolloClient.mutate({
        mutation: updateOrderMutation,
        variables: {
          id: orderId,
          confirmDate: null,
          confirmTime: null,
          confirmedCarId: null
        }
      })
      commit('resetCarInOrder', orderId)

    },
    confirmOrder ({ commit }, payload) {
      const { id, confirmedCarId, confirmDate, confirmTime } = payload
      apolloClient.mutate({
        mutation: updateOrderMutation,
        variables: {
          id,
          confirmDate,
          confirmTime,
          confirmedCarId
        }
      })
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
    carsForAutocomplete: (state) => (type) => state.cars.filter(item => item.type === type),
    carsByType: (state) => (type) => state.cars.filter(item => item.type === type),
    addressesForAutocomplete: (state) => (type) => {
      if (type === 'shippingPlace') {
        return state.addresses.filter(item => item.isShippingPlace)
      } else if (type === 'deliveryPlace') {
        return state.addresses.filter(item => item.isDeliveryPlace)
      } else {
        return state.addresses
      }
    },
    dateRange: (state) => ({
      startDate: moment(state.currentDate).add(-4, 'd').format('YYYY-MM-DD'),
      endDate: moment(state.currentDate).add(+4, 'd').format('YYYY-MM-DD')
    }),
    addressById: (state) => (id) => {
      if (state.addresses.length && id)
        return state.addresses.find(item => item.id === id)
      else return null
    },
    dispatchersStaff: (state) => state.staff.filter(item => item.role === 'dispatcher').map(item => ({ userId: item.userId, userName: item.user.name, userEmail: item.user.email }))
  }
}
