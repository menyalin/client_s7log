import { apolloClient } from '../vue-apollo'
import moment from 'moment'
import { createOrderMutation, updateOrderMutation, confirmOrderMutation, deleteOrderMutation } from '@/gql/orders.js'
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

    statuses: [
      { id: '10', title: 'Надо получить', forConfirmed: false },
      { id: '20', title: 'ОЧЕНЬ надо получить', forConfirmed: false },
      { id: '30', title: 'Получен', forConfirmed: false },
      { id: '40', title: 'В пути или на погрузке', forConfirmed: true },
      { id: '50', title: 'В пути или на выгрузке', forConfirmed: true },
      { id: '60', title: 'Выполнен', forConfirmed: true },
      { id: '97', title: 'Мы сорвали', forConfirmed: false },
      { id: '98', title: 'Мы отказались', forConfirmed: false },
      { id: '99', title: 'Клиент снял заказ', forConfirmed: false }
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
    fillByTemplate: (state, templateId) => {
      const orderTemplate = state.orderTemplates.find(item => item.id === templateId)
      state.editedOrder = Object.assign({}, state.editedOrder, {
        templateId,
        lengthCell: orderTemplate.lengthCell,
        carType: orderTemplate.carType,
        consigneeId: orderTemplate.consigneeId,
        shipperId: orderTemplate.shipperId,
        note: orderTemplate.note,
        status: orderTemplate.status,
        plannedCarType: orderTemplate.plannedCarType,
        weight: orderTemplate.weight,
        pltCount: orderTemplate.pltCount,
        price: orderTemplate.price
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
    orderDeleted: ({ orders }, { id }) => {
      const idx = orders.findIndex(item => item.id === id)
      if (idx !== -1) {
        orders.splice(idx, 1)
      }
    },
    updateOrder: ({ orders }, orderUpdated) => {
      console.log('order from mutation: ', orderUpdated.id);
      const idx = orders.findIndex(i => i.id === orderUpdated.id)
      if (idx !== -1) orders.splice(idx, 1)
      orders.push(orderUpdated)
    },
    setCurrentDate: (state, payload) => {
      state.currentDate = payload
    },
    setOrders: (state, payload) => {
      state.orders = payload
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
    deleteOrder: ({ commit, dispatch, getters }) => {
      apolloClient.mutate({
        mutation: deleteOrderMutation,
        variables: getters.editedOrder
      })
        .then(() => {
          commit('cancelOrderEdit')
        })
        .catch(e => {
          dispatch('setError', e.message)
        })
    },
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
    confirmOrder ({ dispatch }, payload) {
      const { id, carId, dateRange, carType } = payload
      apolloClient.mutate({
        mutation: confirmOrderMutation,
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
    createNewOrder ({ commit, getters }, payload) {
      let variables = null
      if (payload) variables = payload
      else variables = getters.editedOrder
      apolloClient.mutate({
        mutation: createOrderMutation,
        variables
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

    timeZones: (state) => state.timeZones,
    timeZoneById: ({ timeZones }) => (id) => timeZones.find(item => item.id === id),
    statuses: (state) => state.statuses,
    statusTitleById: (state) => (id) => state.statuses.find(item => item.id === id),
    isAddressesUpload: (state) => !!state.addresses.length,
    addresses: ({ addresses }) => addresses,
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



    orderTemplates: (state) => (carType) => state.orderTemplates.filter(item => item.carType === carType),
    allOrderTemplates: (state) => state.orderTemplates,
    showOrderDialog: ({ showOrderDialog }) => showOrderDialog,
    editedOrder: ({ editedOrder }) => editedOrder,
    showOrderDialog_v2: ({ showOrderDialog_v2 }) => showOrderDialog_v2,
    editedOrder_v2: ({ editedOrder_v2 }) => editedOrder_v2,
  }
}

