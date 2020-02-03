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

    staff: [],
    statuses: [
      { id: '10', title: 'Надо получить' },
      { id: '20', title: 'ОЧЕНЬ Надо получить' },
      { id: '30', title: 'Получен' },
      { id: '40', title: 'В пути или на погрузке' },
      { id: '50', title: 'В пути или на выгрузке' },
      { id: '60', title: 'Выполнен' },
      { id: '98', title: 'Мы отказались' },
      { id: '99', title: 'Клиент снял заказ' }
    ],
    schedule: [],
    timeZones: [
      { id: '01', title: '00-06', startTime: '00:00' },
      { id: '02', title: '06-12', startTime: '06:00' },
      { id: '03', title: '12-18', startTime: '12:00' },
      { id: '04', title: '18-24', startTime: '18:00' }
    ],
    orders: []
  },
  mutations: {
    fillByTemplate: (state, templateId) => {
      const orderTemplate = state.orderTemplates.find(item => item.id === templateId)
      state.editedOrder = Object.assign({}, state.editedOrder, {
        templateId,
        lengthCell: orderTemplate.lengthCell,
        carType: orderTemplate.carType,
        consigneeId: orderTemplate.consigneeId,
        shipperId: orderTemplate.shipperId,
        note: orderTemplate.note,
        status: orderTemplate.status
      })
    },
    clearTemplateId: (state) => {
      state.editedOrder.templateId = null
    },
    openEditOrderForm: (state, payload) => {
      state.editedOrder = Object.assign({}, payload)
      state.showOrderDialog = true;
    },
    cancelOrderEdit: (state) => {
      state.showOrderDialog = false
      state.editedOrder = Object.assign({}, {}, { lengthCell: 1, templateId: null })
    },
    setOrderTemplates: (state, payload) => {
      state.orderTemplates = payload
    },
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
    updateOrder: (state, orderUpdated) => {
      let order = state.orders.find(item => item.id === orderUpdated.id)
      if (order) {
        Object.assign(order, orderUpdated)
      } else {
        state.orders.push(orderUpdated)
      }
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
    },
    orderTemplateDeleted: ({ orderTemplates }, id) => {
      orderTemplates.splice(orderTemplates.findIndex(item => item.id === id), 1)
    }
  },
  actions: {
    updateOrder: ({ commit, dispatch, getters }) => {
      apolloClient.mutate({
        mutation: updateOrderMutation,
        variables: getters.editedOrder
      })
        .then(() => {
          commit('cancelOrderEdit')
        })
        .catch(e => {
          dispatch('setError', e.message)
        })
    },
    confirmOrder({ commit, dispatch }, payload) {
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
          dispatch('setError', e.message)
        })
    },
    createNewOrder({ commit, getters }) {
      apolloClient.mutate({
        mutation: createOrderMutation,
        variables: getters.editedOrder
      })
        .then(() => {
          commit('cancelOrderEdit')
        })
        .catch(e => {
          dispatch('setError', e.message)
        })
    }
  },
  getters: {
    orders: ({ orders }) => orders,
    currentDate: (state) => state.currentDate,
    personOnDuty: ({ schedule }) => (date) => schedule.find(item => item.date === date) || 'не задан',

    // notConfirmedOrders: (state) => (carType) => state.orders.filter(item => ((!item.confirmedCarId || !item.confirmTime) && item.carType === carType)),
    // ordersByCarAndConfirmDateZone: (state) => (confirmedCarId, confirmDate, confirmTime) =>
    //   state.orders.filter(item => item.confirmedCarId === confirmedCarId && item.confirmDate === confirmDate && item.confirmTime === confirmTime)[0],
    timeZones: (state) => state.timeZones,
    timeZoneById: ({ timeZones }) => (id) => timeZones.find(item => item.id === id),
    statuses: (state) => state.statuses,
    statusTitleById: (state) => (id) => state.statuses.find(item => item.id === id),
    isAddressesUpload: (state) => !!state.addresses.length,

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
  }
}

