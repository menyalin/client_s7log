import { apolloClient } from '../vue-apollo'
import moment from 'moment'
import { createOrderMutation, updateOrderMutation } from '@/gql/orders.js'
import store from './index'

export default {
  state: {
    showOrderDialog: false,
    editedOrder: {
      lengthCell: 1
    },
    currentDate: null,
    orderTemplates: [],
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
    carWorkSchedule: [],
    carWorkScheduleTypes: [
      { id: 'service', title: 'Сервис' },
      { id: 'holiday', title: 'Выходной' }
    ],
    vehicleType: [
      { value: '10tn', text: '10тн' },
      { value: '20tn', text: '20тн' }
    ],
    timeZones: [
      { id: '01', title: '00-06', startTime: '00:00' },
      { id: '02', title: '06-12', startTime: '06:00' },
      { id: '03', title: '12-18', startTime: '12:00' },
      { id: '04', title: '18-24', startTime: '18:00' }
    ],
    orders: []
  },
  mutations: {
    setCarWorkSchedule: (state, payload) => {
      state.carWorkSchedule = payload
    },
    updateCarWorkSchedule: (state, payload) => {
      const carWorkScheduleItem = state.carWorkSchedule.find(item => item.id === payload.id)
      if (carWorkScheduleItem) Object.assign(carWorkScheduleItem, payload)
      else state.carWorkSchedule.push(payload)
    },
    deletedCarWorkSchedule: ({ carWorkSchedule }, id) => {
      carWorkSchedule.splice(carWorkSchedule.findIndex(item => item.id === id), 1)
    },
    fillByTemplate: (state, templateId) => {
      const orderTemplate = state.orderTemplates.find(item => item.id === templateId)
      state.editedOrder = Object.assign({}, state.editedOrder, orderTemplate)
    },
    openEditOrderForm: (state, editedOrder) => {
      if (editedOrder) {
        state.editedOrder = Object.assign({}, state.editedOrder, editedOrder)
      }
      state.showOrderDialog = true;
    },
    cancelOrderEdit: (state) => {
      state.showOrderDialog = false
      state.editedOrder = Object.assign({}, { lengthCell: 1 })
    },
    setOrderTemplates: (state, payload) => {
      state.orderTemplates = payload
    },
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
    },
    scheduleUpdated: (state, payload) => {
      let scheduleItem = state.schedule.find(item => item.id === payload.id)
      if (scheduleItem) scheduleItem = Object.assign(scheduleItem, payload)
      else state.schedule.push(payload)

    },
    updateStaff: (state, role) => {
      let staffItem = state.staff.find(item => item.id === role.id)
      if (staffItem) staffItem = Object.assign({}, staffItem, role)
      else state.staff.push(role)
    },
    updateOrderTemplate: (state, updatedOrder) => {
      let templateItem = state.orderTemplates.find(item => item.id === updatedOrder.id)
      if (templateItem) templateItem = Object.assign(templateItem, {}, updatedOrder)
      else state.orderTemplates.push(updatedOrder)
    }
  },
  actions: {
    updateOrder: ({ commit, getters }) => {
      apolloClient.mutate({
        mutation: updateOrderMutation,
        variables: getters.editedOrder
      })
        .then(() => {
          commit('cancelOrderEdit')
        })
        .catch(e => {
          commit('setError', e.message)
        })
    },
    confirmOrder ({ commit }, payload) {
      const { id, carId, dateRange, carType } = payload
      apolloClient.mutate({
        mutation: updateOrderMutation,
        variables: {
          id,
          carId,
          dateRange,
          carType
        }
      })
        .catch(e => {
          commit('setError', e.message)
        })
      // commit('confirmOrder', payload)
    },
    createNewOrder ({ commit, getters }) {
      apolloClient.mutate({
        mutation: createOrderMutation,
        variables: getters.editedOrder
      })
        .then(() => {
          commit('cancelOrderEdit')
        })
        .catch(e => {
          commit('setError', e.message)
        })
    }
  },
  getters: {
    orders: ({ orders }) => orders,
    currentDate: (state) => state.currentDate,
    personOnDuty: ({ schedule }) => (date) => schedule.find(item => item.date === date) || 'не задан',
    vehicleType: state => state.vehicleType,
    cars: state => state.cars,
    carById: ({ cars }) => (id) => {
      if (cars.length && id) return cars.find(item => item.id === id)
      else null
    },
    notConfirmedOrders: (state) => (carType) => state.orders.filter(item => ((!item.confirmedCarId || !item.confirmTime) && item.carType === carType)),
    ordersByCarAndConfirmDateZone: (state) => (confirmedCarId, confirmDate, confirmTime) =>
      state.orders.filter(item => item.confirmedCarId === confirmedCarId && item.confirmDate === confirmDate && item.confirmTime === confirmTime)[0],
    timeZones: (state) => state.timeZones,
    timeZoneById: ({ timeZones }) => (id) => timeZones.find(item => item.id === id),
    statuses: (state) => state.statuses,
    statusTitleById: (state) => (id) => state.statuses.find(item => item.id === id),
    isAddressesUpload: (state) => !!state.addresses.length,
    carsForAutocomplete: ({ cars }) => (type) => type ? cars.filter(item => item.type === type) : cars,
    carsByType: (state) => (type) => state.cars.filter(item => (item.type === type && !item.isTempSlot)),
    carSlotsByType: (state) => (type) => state.cars.filter(item => (item.type === type && item.isTempSlot)),
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
      startDate: moment(state.currentDate).add(-3, 'd').format('YYYY-MM-DD'),
      endDate: moment(state.currentDate).add(+3, 'd').format('YYYY-MM-DD')
    }),
    addressById: (state) => (id) => {
      if (state.addresses.length && id)
        return state.addresses.find(item => item.id === id)
      else return null
    },
    dispatchersStaff: (state) => state.staff.filter(item => (item.role === 'dispatcher' && item.isActive)).map(item => ({ userId: item.userId, userName: item.user.name, userEmail: item.user.email })),
    dutyDispatcher: (state) => (date) => state.schedule.find(item => item.date === date),
    orderTemplates: (state) => (carType) => state.orderTemplates.filter(item => item.carType === carType),
    allOrderTemplates: (state) => state.orderTemplates,
    showOrderDialog: ({ showOrderDialog }) => showOrderDialog,
    editedOrder: ({ editedOrder }) => editedOrder,
    carWorkSchedule: ({ carWorkSchedule }) => carWorkSchedule,
    carWorkScheduleTypes: ({ carWorkScheduleTypes }) => carWorkScheduleTypes,
    carWorkScheduleTypeById: ({ carWorkScheduleTypes }) => (id) => carWorkScheduleTypes.find(item => item.id === id),
    // carWorkScheduleCells: ({ carWorkSchedule, timeZones }) => {
    //   if (carWorkSchedule.length) {
    //     let res = []
    //     carWorkSchedule.forEach(carWorkScheduleItem => {
    //       let day = moment(carWorkScheduleItem.startDate)
    //       let endDate = moment(carWorkScheduleItem.endDate)
    //       const endTime = timeZones.findIndex(item => item.id === carWorkScheduleItem.endTime)
    //       let i = timeZones.findIndex(item => item.id === carWorkScheduleItem.startTime)
    //       let lastDay = false
    //       while (day <= endDate) {
    //         if (day >= endDate) lastDay = true
    //         while (i < timeZones.length) {
    //           if (lastDay && i > endTime) break
    //           else res.push({
    //             carWorkScheduleId: carWorkScheduleItem.id,
    //             date: day.format('YYYY-MM-DD'),
    //             time: timeZones[i].id,
    //             carId: carWorkScheduleItem.carId,
    //             type: carWorkScheduleItem.type,
    //             note: carWorkScheduleItem.note
    //           })
    //           i++
    //         }
    //         i = 0
    //         day.add(1, 'days')
    //       }
    //     })
    //     return res
    //   } else return null
    // },

    // carWorkScheduleFiltered: () => (carId, date, time) => {
    //   let cells = store.getters.carWorkScheduleCells
    //   if (cells && date && time && carId) {
    //     return cells.find(item => item.carId === carId && item.date === date && item.time === time)
    //   }
    //   else return null
    // },
    ordersV2: ({ ordersV2 }) => ordersV2
  }
}

